import { summerPlan, weekNames } from "./summer-plan.js";

const KEY = "ai-study-coach-v2";
const DAY = 86400000;
const $ = (id) => document.getElementById(id);
const iso = (date = new Date()) => date.toISOString().slice(0, 10);
const escapeHtml = (value = "") => String(value).replace(/[&<>'"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[c]);

const demoTopics = [
  {id: crypto.randomUUID(), subject:"程序设计", chapter:"数组与循环边界", importance:5, mastery:2, difficulty:2, minutes:45, prerequisite:"", tags:["基础","易错"], questionCount:2, collectedCount:1, learned:false},
  {id: crypto.randomUUID(), subject:"程序设计", chapter:"链表与动态内存", importance:4, mastery:2, difficulty:5, minutes:120, prerequisite:"", tags:["综合题"], questionCount:1, collectedCount:1, learned:false},
];
const saved = JSON.parse(localStorage.getItem(KEY) || "null");
const state = saved || {topics: demoTopics, dailyMinutes:90, sync:null};
if (!Array.isArray(state.topics)) state.topics = [];
const removedTopicIds = new Set(
  state.topics
    .filter(topic => topic.subject === "程序设计" && topic.chapter === "指针与数组")
    .map(topic => topic.id),
);
state.topics = state.topics.filter(topic => !removedTopicIds.has(topic.id));
state.topics.forEach(topic => {
  if (removedTopicIds.has(topic.prerequisite)) topic.prerequisite = "";
});
if (!state.planStartDate) state.planStartDate = iso();
if (!Array.isArray(state.planCompleted)) state.planCompleted = [];
if (removedTopicIds.size) save();
let selectedWeek = 0;

function save(){ localStorage.setItem(KEY, JSON.stringify(state)); }
function daysUntil(date){ return date ? Math.ceil((new Date(date + "T23:59:59") - new Date()) / DAY) : 30; }
function priority(topic){
  const weak = (6 - Number(topic.mastery || 3)) * 10;
  const importance = Number(topic.importance || 3) * 12;
  const difficulty = Number(topic.difficulty || 3) * 3;
  const errors = Math.min(18, Number(topic.questionCount || 0) * 4 + Number(topic.collectedCount || 0) * 3);
  const overdue = topic.nextReview && daysUntil(topic.nextReview) <= 0 ? 12 : 0;
  const learnedDiscount = topic.learned && !overdue ? 22 : 0;
  return Math.max(0, Math.min(100, Math.round(importance + weak + difficulty + errors + overdue - learnedDiscount - 25)));
}
function reason(topic){
  const reasons=[];
  if(topic.importance>=4) reasons.push("重要度高");
  if(topic.mastery<=2) reasons.push("掌握薄弱");
  if(topic.questionCount>=2) reasons.push(`${topic.questionCount} 道错题`);
  if(topic.difficulty>=4) reasons.push("学习难度较高");
  if(topic.nextReview && daysUntil(topic.nextReview)<=0) reasons.push("复习已到期");
  return reasons.slice(0,3).join(" · ") || "按常规节奏推进";
}
function level(score){ return score>=70 ? "high" : score>=45 ? "mid" : "low"; }
function topicName(id){ return state.topics.find(t=>t.id===id)?.chapter || ""; }
function sortedTopics(){
  const mode=$('sortMode').value, query=$('searchTopic').value.trim().toLowerCase(), subject=$('subjectFilter').value;
  const list=state.topics.filter(t=>(!subject||t.subject===subject)&&(!query||[t.subject,t.chapter,...(t.tags||[])].some(v=>String(v).toLowerCase().includes(query))));
  if(mode==='mastery') return list.sort((a,b)=>a.mastery-b.mastery||priority(b)-priority(a));
  if(mode==='dependency') return topological(list);
  return list.sort((a,b)=>priority(b)-priority(a));
}
function topological(list){
  const ids=new Set(list.map(t=>t.id)), result=[], seen=new Set();
  function visit(t){ if(seen.has(t.id))return; seen.add(t.id); if(t.prerequisite&&ids.has(t.prerequisite)) visit(list.find(x=>x.id===t.prerequisite)); result.push(t); }
  [...list].sort((a,b)=>priority(b)-priority(a)).forEach(visit); return result;
}
function render(){
  const ranked=[...state.topics].sort((a,b)=>priority(b)-priority(a)); const top=ranked[0];
  $('topicCount').textContent=state.topics.length; $('urgentCount').textContent=state.topics.filter(t=>priority(t)>=70).length;
  $('reviewCount').textContent=state.topics.filter(t=>t.nextReview&&daysUntil(t.nextReview)<=0).length;
  $('totalHours').textContent=`${Math.round(state.topics.filter(t=>!t.learned).reduce((n,t)=>n+Number(t.minutes||0),0)/6)/10}h`;
  $('topPriority').textContent=top?`${top.subject} · ${top.chapter}`:"等待添加知识点"; $('topScore').textContent=top?priority(top):"--"; $('topReason').textContent=top?reason(top):"添加或导入资料后，系统会解释排序依据。";
  renderSummerPlan(); renderFilters(); renderPriority(); renderPath(); renderReviews(); renderSync();
}
function planDate(index){
  const date=new Date(`${state.planStartDate}T12:00:00`); date.setDate(date.getDate()+index); return iso(date);
}
function renderSummerPlan(){
  const completed=new Set(state.planCompleted), done=completed.size, percent=Math.round(done/summerPlan.length*100);
  $('planProgress').textContent=`${percent}%`; $('planProgressText').textContent=`${done} / ${summerPlan.length} 天`;
  $('planStartDate').value=state.planStartDate;
  $('weekTabs').innerHTML=`<button class="${selectedWeek===0?'active':''}" data-week="0">全部</button>`+weekNames.map((name,i)=>`<button class="${selectedWeek===i+1?'active':''}" data-week="${i+1}">W${i+1} ${escapeHtml(name)}</button>`).join('');
  const list=summerPlan.map((item,index)=>({...item,index,day:index+1,date:planDate(index)})).filter(item=>!selectedWeek||item.week===selectedWeek);
  $('dailyPlanList').innerHTML=list.map(item=>`<article class="day-card ${completed.has(item.day)?'completed':''}" id="plan-day-${item.day}">
    <div class="day-rail"><span>DAY</span><strong>${String(item.day).padStart(2,'0')}</strong><small>${item.date}</small><i></i></div>
    <div class="day-content"><div class="day-title"><div><span>第 ${item.week} 周 · ${escapeHtml(weekNames[item.week-1])} · ${item.minutes} 分钟</span><h3>${escapeHtml(item.title)}</h3></div><button class="plan-check ${completed.has(item.day)?'checked':''}" data-plan-day="${item.day}">${completed.has(item.day)?'✓ 已完成':'标记完成'}</button></div>
      <div class="day-learn"><b>今天学什么</b><p>${escapeHtml(item.learn)}</p></div>
      <div class="day-grid"><div><b>动手任务</b><ol>${item.tasks.map(task=>`<li>${escapeHtml(task)}</li>`).join('')}</ol></div><div><b>当日产出</b><p>${escapeHtml(item.output)}</p><b>资料与网课</b><div class="resource-links">${item.resources.map(([name,url])=>`<a href="${url}" target="_blank" rel="noopener">${escapeHtml(name)} ↗</a>`).join('')}</div></div></div>
      <details><summary>完成后复盘（建议写进当天笔记）</summary><ul>${item.review.map(question=>`<li>${escapeHtml(question)}</li>`).join('')}</ul></details>
    </div></article>`).join('');
}
function renderFilters(){
  const current=$('subjectFilter').value; const subjects=[...new Set(state.topics.map(t=>t.subject))].sort();
  $('subjectFilter').innerHTML='<option value="">全部学科</option>'+subjects.map(s=>`<option ${s===current?'selected':''}>${escapeHtml(s)}</option>`).join('');
}
function renderPriority(){
  const list=sortedTopics(); $('priorityList').innerHTML=list.length?list.map((t,index)=>{const score=priority(t);return `<article class="priority-item ${level(score)}" data-edit="${t.id}"><div class="rank">${String(index+1).padStart(2,'0')}</div><div class="topic-main"><div><span class="subject">${escapeHtml(t.subject)}</span>${(t.tags||[]).map(tag=>`<span class="tag">${escapeHtml(tag)}</span>`).join('')}</div><h3>${escapeHtml(t.chapter)}</h3><p>${reason(t)}${t.prerequisite?` · 前置：${escapeHtml(topicName(t.prerequisite))}`:''}</p></div><div class="mastery"><span>掌握度</span><b>${t.mastery}/5</b><div><i style="width:${t.mastery*20}%"></i></div></div><div class="priority-score"><strong>${score}</strong><span>优先分</span></div><button class="ghost compact">调整</button></article>`}).join(''):'<div class="empty">没有匹配的知识点。点击“添加知识点”开始规划。</div>';
}
function renderPath(){
  const active=topological(state.topics.filter(t=>!t.learned)); const daily=Math.max(15,Number(state.dailyMinutes||90)); let cursor=new Date(), used=0;
  $('pathSummary').textContent=active.length?`预计 ${Math.ceil(active.reduce((n,t)=>n+Number(t.minutes),0)/daily)} 个学习日完成当前路径；前置知识会自动排在后续内容之前。`:'当前学习路径已完成，可进入巩固复习。';
  $('pathList').innerHTML=active.length?active.map((t,i)=>{if(used+Number(t.minutes)>daily){cursor=new Date(cursor.getTime()+DAY);used=0;} used+=Number(t.minutes);return `<article><div class="timeline-dot">${i+1}</div><div><span>${iso(cursor)} · ${t.minutes} 分钟</span><h3>${escapeHtml(t.chapter)}</h3><p>${i===0?'建议下一步：':''}${reason(t)}。学习后先闭卷复述，再完成相关练习。</p></div><button data-complete="${t.id}" class="ghost compact">完成学习</button></article>`}).join(''):'<div class="empty">暂无未完成的学习任务。</div>';
}
function reviewLabel(date){const d=daysUntil(date);return d<0?`逾期 ${Math.abs(d)} 天`:d===0?'今天':d===1?'明天':`${d} 天后`;}
function renderReviews(){
  const list=state.topics.filter(t=>t.learned||t.nextReview).sort((a,b)=>String(a.nextReview).localeCompare(String(b.nextReview)));
  $('reviewList').innerHTML=list.length?list.map(t=>`<article class="review-card ${daysUntil(t.nextReview)<=0?'due':''}"><span>${reviewLabel(t.nextReview)}</span><h3>${escapeHtml(t.chapter)}</h3><p>${t.questionCount?`先重做 ${t.questionCount} 道关联错题，再进行主动回忆。`:'遮住资料复述核心概念，再用一道题验证。'}</p><div><small>第 ${t.reviewStage||1} 轮 · ${t.nextReview}</small><button data-reviewed="${t.id}" class="ghost compact">完成复习</button></div></article>`).join(''):'<div class="empty">完成一个知识点后，这里会自动生成间隔复习任务。</div>';
}
function renderSync(){ $('syncDot').className=state.sync?'connected':''; $('syncText').textContent=state.sync?`已同步 ${state.sync.notes} 篇笔记、${state.sync.questions} 道错题 · ${state.sync.date}`:'尚未同步资料库'; }
function openTopic(id){
  const t=state.topics.find(x=>x.id===id); $('topicForm').reset(); $('topicId').value=t?.id||''; $('topicDialogTitle').textContent=t?'调整知识点':'添加知识点';
  const fields={topicSubject:t?.subject||'',topicChapter:t?.chapter||'',topicImportance:t?.importance||4,topicMastery:t?.mastery||2,topicDifficulty:t?.difficulty||3,topicMinutes:t?.minutes||60,topicTags:(t?.tags||[]).join(', ')}; Object.entries(fields).forEach(([k,v])=>$(k).value=v);
  $('topicPrerequisite').innerHTML='<option value="">无前置知识</option>'+state.topics.filter(x=>x.id!==id).map(x=>`<option value="${x.id}" ${x.id===t?.prerequisite?'selected':''}>${escapeHtml(x.subject)} · ${escapeHtml(x.chapter)}</option>`).join('');
  $('deleteTopic').classList.toggle('hidden',!t); updateOutputs(); $('topicDialog').showModal();
}
function updateOutputs(){ $('importanceOutput').value=$('topicImportance').value; $('masteryOutput').value=$('topicMastery').value; $('difficultyOutput').value=$('topicDifficulty').value; }
function toast(message){$('toast').textContent=message;$('toast').classList.add('show');setTimeout(()=>$('toast').classList.remove('show'),2600);}
function completeLearning(id){const t=state.topics.find(x=>x.id===id);t.learned=true;t.lastStudied=iso();t.reviewStage=1;t.nextReview=iso(new Date(Date.now()+DAY));save();render();toast('已加入明日复习计划');}
function completeReview(id){const t=state.topics.find(x=>x.id===id), gaps=[1,3,7,14,30,60];t.reviewStage=Math.min((t.reviewStage||1)+1,gaps.length);t.lastStudied=iso();t.nextReview=iso(new Date(Date.now()+gaps[t.reviewStage-1]*DAY));t.mastery=Math.min(5,Number(t.mastery)+1);save();render();toast(`下一次复习：${t.nextReview}`);}
function importKnowledge(data){
  if(!Array.isArray(data.notes)||!Array.isArray(data.questions)) throw new Error('格式不兼容'); const groups=new Map();
  const get=(x)=>{const key=`${x.subject||'未分类'}::${x.chapter||'未分章'}`;if(!groups.has(key))groups.set(key,{subject:x.subject||'未分类',chapter:x.chapter||'未分章',notes:[],questions:[]});return groups.get(key);};
  data.notes.forEach(n=>get(n).notes.push(n));data.questions.forEach(q=>get(q).questions.push(q));
  for(const g of groups.values()){const existing=state.topics.find(t=>t.subject===g.subject&&t.chapter===g.chapter);const collected=g.questions.filter(q=>q.collect).length;const tags=[...new Set(g.notes.flatMap(n=>Array.isArray(n.tags)?n.tags:[]))];const patch={questionCount:g.questions.length,collectedCount:collected,tags,importance:Math.min(5,3+(collected>0?1:0)+(g.questions.length>=3?1:0)),mastery:g.questions.length?2:3,difficulty:Math.min(5,2+Math.ceil(g.questions.length/2)),minutes:Math.max(30,g.notes.length*25+g.questions.length*15)};if(existing)Object.assign(existing,patch);else state.topics.push({id:crypto.randomUUID(),...patch,subject:g.subject,chapter:g.chapter,prerequisite:'',learned:false});}
  state.sync={notes:data.notes.length,questions:data.questions.length,date:new Date().toLocaleString('zh-CN')};save();render();toast(`已生成 ${groups.size} 个知识点`);
}

$('openTopic').onclick=()=>openTopic(); $('openImport').onclick=()=>$('importDialog').showModal(); $('importNotes').onclick=()=>$('notesFile').click(); $('chooseImport').onclick=()=>{$('importDialog').close();$('notesFile').click();};
$('openLocalNotes').onclick=()=>{location.href='file:///C:/Users/38680/Desktop/study_notes_web/index.html';setTimeout(()=>toast('若浏览器拦截，请直接在文件资源管理器中打开该地址'),500);};
$('notesFile').onchange=()=>{const file=$('notesFile').files[0];if(!file)return;const reader=new FileReader();reader.onload=()=>{try{importKnowledge(JSON.parse(reader.result));}catch(e){alert(`导入失败：${e.message}`);}};reader.readAsText(file,'utf-8');};
$('topicForm').onsubmit=(e)=>{e.preventDefault();const id=$('topicId').value;const old=state.topics.find(t=>t.id===id)||{};const topic={...old,id:id||crypto.randomUUID(),subject:$('topicSubject').value.trim(),chapter:$('topicChapter').value.trim(),importance:Number($('topicImportance').value),mastery:Number($('topicMastery').value),difficulty:Number($('topicDifficulty').value),minutes:Number($('topicMinutes').value),prerequisite:$('topicPrerequisite').value,tags:$('topicTags').value.split(/[,，]/).map(x=>x.trim()).filter(Boolean),learned:old.learned||false};if(id)state.topics.splice(state.topics.findIndex(t=>t.id===id),1,topic);else state.topics.push(topic);save();$('topicDialog').close();render();};
$('deleteTopic').onclick=()=>{const id=$('topicId').value;if(confirm('确定删除这个知识点吗？')){state.topics=state.topics.filter(t=>t.id!==id);state.topics.forEach(t=>{if(t.prerequisite===id)t.prerequisite='';});save();$('topicDialog').close();render();}};
document.addEventListener('click',e=>{const edit=e.target.closest('[data-edit]'),complete=e.target.closest('[data-complete]'),reviewed=e.target.closest('[data-reviewed]');if(edit&&!complete&&!reviewed)openTopic(edit.dataset.edit);if(complete){e.stopPropagation();completeLearning(complete.dataset.complete);}if(reviewed)completeReview(reviewed.dataset.reviewed);});
document.addEventListener('click',e=>{const week=e.target.closest('[data-week]'),day=e.target.closest('[data-plan-day]');if(week){selectedWeek=Number(week.dataset.week);renderSummerPlan();}if(day){const value=Number(day.dataset.planDay),index=state.planCompleted.indexOf(value);if(index>=0)state.planCompleted.splice(index,1);else state.planCompleted.push(value);save();renderSummerPlan();}});
['topicImportance','topicMastery','topicDifficulty'].forEach(id=>$(id).oninput=updateOutputs);['searchTopic','subjectFilter','sortMode'].forEach(id=>$(id).oninput=()=>{renderPriority();});
$('dailyMinutes').value=state.dailyMinutes;$('dailyMinutes').onchange=()=>{state.dailyMinutes=Number($('dailyMinutes').value)||90;save();renderPath();};$('refreshReview').onclick=()=>{renderReviews();toast('复习计划已按最新掌握度更新');};
$('exportData').onclick=()=>{const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'});const a=Object.assign(document.createElement('a'),{href:URL.createObjectURL(blob),download:`study-path-${iso()}.json`});a.click();URL.revokeObjectURL(a.href);};
$('planStartDate').onchange=()=>{state.planStartDate=$('planStartDate').value||iso();save();renderSummerPlan();};
$('jumpToday').onclick=()=>{const start=new Date(`${state.planStartDate}T00:00:00`),now=new Date();const day=Math.floor((new Date(now.getFullYear(),now.getMonth(),now.getDate())-start)/DAY)+1;if(day<1||day>summerPlan.length){toast('今天不在当前 8 周计划范围内');return;}selectedWeek=Math.ceil(day/7);renderSummerPlan();requestAnimationFrame(()=>$(`plan-day-${day}`)?.scrollIntoView({behavior:'smooth',block:'center'}));};
render();
