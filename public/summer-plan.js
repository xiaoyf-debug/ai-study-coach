const links = {
  missing: ["The Missing Semester", "https://missing.csail.mit.edu/"],
  shell: ["Missing Semester：Shell", "https://missing.csail.mit.edu/2020/course-shell/"],
  tools: ["Missing Semester：Shell 工具", "https://missing.csail.mit.edu/2020/shell-tools/"],
  editors: ["Missing Semester：编辑器", "https://missing.csail.mit.edu/2020/editors/"],
  data: ["Missing Semester：数据整理", "https://missing.csail.mit.edu/2020/data-wrangling/"],
  cli: ["Missing Semester：命令行环境", "https://missing.csail.mit.edu/2020/command-line/"],
  git: ["Missing Semester：Git", "https://missing.csail.mit.edu/2020/version-control/"],
  progit: ["Pro Git 中文版", "https://git-scm.com/book/zh/v2"],
  github: ["GitHub Skills", "https://skills.github.com/"],
  vscode: ["VS Code 入门", "https://code.visualstudio.com/docs/getstarted/getting-started"],
  gdb: ["GDB 官方文档", "https://sourceware.org/gdb/current/onlinedocs/gdb.html/"],
  cmake: ["CMake 官方教程", "https://cmake.org/cmake/help/latest/guide/tutorial/"],
  py: ["Python 官方教程", "https://docs.python.org/zh-cn/3/tutorial/"],
  cs50p: ["Harvard CS50P", "https://cs50.harvard.edu/python/"],
  pytest: ["pytest 入门", "https://docs.pytest.org/en/stable/getting-started.html"],
  typing: ["Python 类型标注", "https://docs.python.org/zh-cn/3/library/typing.html"],
  packaging: ["Python Packaging 指南", "https://packaging.python.org/en/latest/tutorials/packaging-projects/"],
  sqlite: ["SQLite 官方教程", "https://www.sqlite.org/quickstart.html"],
  actions: ["GitHub Actions 教程", "https://docs.github.com/zh/actions/writing-workflows/quickstart"],
  fastapi: ["FastAPI 官方教程", "https://fastapi.tiangolo.com/zh/tutorial/"],
  licenses: ["Choose a License", "https://choosealicense.com/"],
};

const split = text => text.split("；");
const day = (week, title, minutes, learn, tasks, output, review, resources) => ({
  week, title, minutes, learn, tasks: split(tasks), output, review: split(review), resources: resources.map(key => links[key])
});

export const summerPlan = [
  day(1,"建立暑假开发环境",150,"理解终端、编辑器、编译器和版本控制各自负责什么。","注册 GitHub；安装 Git、Python、VS Code、CMake 与编译器；逐一运行版本检查并截图","GitHub 仓库 summer-learning-2026 与 environment.md","哪些工具仍不会独立启动？；环境问题最终是怎样定位的？",["vscode","github"]),
  day(1,"路径、文件与目录",150,"掌握 pwd、cd、ls、mkdir、cp、mv、rm 和相对/绝对路径。","观看 Shell 课程前半；只用终端建立五层练习目录；完成 15 个文件操作并记录命令","notes/week1/day02-shell-basics.md","哪三个命令最容易误操作？；能否不用文件管理器完成同样任务？",["shell"]),
  day(1,"输入输出、管道与重定向",165,"理解 stdin、stdout、stderr、管道与退出状态。","练习 >、>>、<、2> 和 |；组合 grep、sort、uniq、wc；把系统日志统计结果保存为文件","scripts/log-summary.sh","管道中数据如何流动？；哪条组合命令值得保存为速查表？",["shell","data"]),
  day(1,"搜索与文本处理",165,"掌握 find、grep、正则表达式、sed/awk 的基本用途。","按名称和内容搜索文件；提取一份日志中的错误行；统计出现频率最高的十个词","scripts/text-analyzer.sh","find 与 grep 分别解决什么问题？；正则表达式哪里写错过？",["tools","data"]),
  day(1,"进程、权限与环境变量",150,"理解进程、信号、权限、PATH 与环境变量。","练习 ps、kill、chmod、which；创建并终止后台任务；给自写脚本添加执行权限并加入 PATH","notes/week1/process-and-path.md","程序为什么能通过名字被找到？；SIGTERM 与强制终止有什么区别？",["cli"]),
  day(1,"编写第一个自动化脚本",180,"把重复操作写成可复用 Shell 脚本。","学习变量、参数、条件和循环；编写每日目录初始化脚本；加入参数校验、退出码和帮助文本","scripts/new-study-day.sh","脚本处理了哪些异常输入？；下次还能自动化哪件重复工作？",["shell","tools"]),
  day(1,"周复盘：脱离教程使用终端",90,"通过闭卷任务检验第一周是否真正掌握。","闭卷重建练习目录；整理 shell-cheatsheet.md；清理仓库并提交周总结","week1-review.md 与清晰的 Git 提交","本周最常查的五个命令是什么？；下周怎样减少复制粘贴命令？",["missing"]),

  day(2,"Git 心智模型",165,"理解工作区、暂存区、提交和仓库，而不是死记命令。","阅读 Pro Git 基础；练习 status、diff、add、commit、log；用图画出三个区域的变化","notes/week2/git-model.md","暂存区有什么价值？；提交前应该检查哪两项内容？",["git","progit"]),
  day(2,"分支、合并与冲突",180,"掌握 feature branch 工作流和冲突解决。","创建两个功能分支；刻意修改同一行制造冲突；手工解决后查看提交图","仓库中保留一次 merge commit 和冲突复盘","冲突产生的直接原因是什么？；解决后如何确认没有丢代码？",["git","progit"]),
  day(2,"GitHub 与 Pull Request",165,"理解远端仓库、Issue、PR 和 Code Review。","完成 GitHub Skills 入门；创建 issue；用分支提交改动并发起 PR；在 PR 中写测试说明","一个完整 issue 和一个已合并 PR","PR 描述是否让陌生人看得懂？；commit 是否足够小且有意义？",["github","progit"]),
  day(2,"VS Code 高效开发",150,"掌握工作区、快捷键、搜索、重构和集成终端。","完成 VS Code 入门；安装 Python/C++ 扩展；练习全局搜索、重命名、格式化和断点",".vscode 配置及快捷键速查表","哪些操作仍依赖鼠标？；编辑器自动化帮你避免了什么错误？",["vscode","editors"]),
  day(2,"使用 GDB 调试",180,"学习断点、单步执行、查看变量和调用栈。","编写含数组越界与空指针错误的 C 程序；使用 break、run、next、step、print、bt 定位；修复并记录","debug-lab/ 与 bug-report.md","错误症状与根因有什么不同？；哪一个 GDB 命令最有效？",["gdb"]),
  day(2,"使用 CMake 管理多文件项目",180,"理解配置阶段、构建阶段、目标和依赖。","完成 CMake 教程第一步；拆分 calculator 为 include/src/tests；从空 build 目录完成构建","calculator/CMakeLists.txt 和可运行程序","target 与源文件是什么关系？；为什么不应提交 build 目录？",["cmake"]),
  day(2,"周复盘：工具链综合演练",120,"把 terminal、Git、VS Code、GDB、CMake 串成一次完整开发。","从 issue 开始新增 calculator 功能；用 GDB 调试；CMake 构建；通过 PR 合并；写周报","week2-review.md 和发布标签 v0.1.0","哪一步最拖慢开发？；若电脑重装，能否凭文档恢复环境？",["git","gdb","cmake"]),

  day(3,"Python 表达式与数据类型",165,"用已有 C/C++ 基础快速掌握 Python 语法差异。","学习 CS50P Functions/Variables；练习字符串、数字和输入输出；完成 8 个小练习","python/week3/basics.py","动态类型带来了什么便利与风险？；哪些 C 写法不应照搬到 Python？",["cs50p","py"]),
  day(3,"条件、循环与模式匹配",165,"熟练使用 if、for、while、range 和 enumerate。","学习 CS50P Conditionals/Loops；重写三个旧 C 练习；为非法输入加入重试逻辑","python/week3/control_flow.py","for 与 while 应如何选择？；哪里出现了边界错误？",["cs50p","py"]),
  day(3,"列表、元组、字典与集合",180,"根据数据语义选择合适容器。","阅读数据结构章节；完成词频统计；实现学生成绩分组、排序和去重","python/week3/grade_stats.py","为什么这里使用 dict 而不是 list？；可变与不可变对象有何影响？",["py"]),
  day(3,"函数、作用域与模块",180,"写职责单一、可复用、可测试的函数。","学习参数、返回值、作用域；把 grade_stats 拆成模块；为每个函数补文档字符串","python/week3/grade_tool/ 包","哪个函数职责过多？；模块边界是按什么依据划分的？",["cs50p","py"]),
  day(3,"文件、路径和异常处理",180,"安全读写文本、CSV、JSON，并处理可预期错误。","学习 pathlib、with、try/except；编写文件批量重命名工具；加入预览模式和错误日志","python/week3/file_renamer.py","哪些错误应该捕获，哪些应暴露？；如何避免误改用户文件？",["py"]),
  day(3,"命令行 Python 程序",180,"让 Python 工具通过 terminal 接收参数并给出帮助。","学习 argparse；把文件工具改成 CLI；设计 --dry-run、--help 和退出码；测试三种错误输入","可安装/可直接运行的 renamer CLI","命令行接口是否直观？；错误信息能否指导用户修正？",["py"]),
  day(3,"周复盘：闭卷完成小工具",120,"检验能否脱离视频独立写 Python。","闭卷实现日志分析器；对照本周代码重构；整理 Python 与 C++ 差异表","python/week3/log_analyzer.py 和 week3-review.md","本周仍会查阅哪些语法？；代码中最明显的坏味道是什么？",["cs50p","py"]),

  day(4,"虚拟环境与依赖",150,"理解项目隔离和可复现环境。","创建 venv；安装第三方包；生成依赖声明；删除环境后按文档重建","python-engineering/README.md 与 .gitignore","为什么不能把 .venv 提交？；别人如何准确重建环境？",["packaging"]),
  day(4,"pytest 单元测试",180,"掌握 arrange-act-assert、测试发现和断言。","学习 pytest 入门；为成绩工具写正常、边界、异常测试；运行单个测试和完整测试集","不少于 12 个 pytest 测试","测试是在证明正确还是寻找反例？；哪个边界条件此前没想到？",["pytest"]),
  day(4,"测试替身与临时文件",180,"隔离文件系统、时间和外部依赖。","使用 tmp_path 测试文件工具；学习 fixture；模拟错误输入；确保测试可重复执行","file_renamer 的隔离测试","测试是否依赖本机路径？；fixture 是否减少了重复代码？",["pytest"]),
  day(4,"类型标注与静态检查",165,"用类型表达接口意图，提前发现低级错误。","为核心函数添加类型标注；了解 Optional、Iterable、TypedDict；运行类型检查并修复问题","带完整公共接口类型标注的项目","哪类错误被静态检查提前发现？；哪里不适合写过度复杂的类型？",["typing"]),
  day(4,"日志、配置与异常边界",180,"区分用户提示、程序日志和异常。","加入 logging；把路径等参数移入配置；设计领域异常；避免空 except","logs/ 示例和错误处理说明","日志中应包含哪些排错上下文？；异常应在哪一层转成用户提示？",["py"]),
  day(4,"项目结构与 pyproject.toml",180,"形成 src/tests/docs 分离的标准项目结构。","阅读 Packaging 教程；迁移到 src layout；配置项目元数据和命令入口；全新安装验证","规范 Python 包 v0.1.0","安装后为什么仍能找到模块？；项目元数据哪些是发布必需的？",["packaging"]),
  day(4,"周复盘：工程化改造",120,"比较一次性脚本和可维护项目的差别。","运行全部测试和检查；让同学按 README 安装；记录失败点并修文档；发布 v0.2.0","week4-review.md 与可复现安装说明","新人最容易卡在哪里？；下周项目要坚持哪三条规范？",["pytest","packaging"]),

  day(5,"SQL 与关系数据模型",180,"理解表、行、主键、外键和规范化的基本思想。","学习 SQLite Quickstart；设计课程、任务、学习记录三张表；写建表与样例数据脚本","project/schema.sql 和 ER 草图","每张表表示什么实体？；哪些字段不应重复存储？",["sqlite"]),
  day(5,"SQL 增删改查与连接",180,"掌握 SELECT、INSERT、UPDATE、DELETE、JOIN 和聚合。","完成 15 条查询练习；统计逾期任务与课程完成率；用事务执行批量更新","project/queries.sql","JOIN 的依据是什么？；误删数据如何通过事务降低风险？",["sqlite"]),
  day(5,"需求分析与用户故事",165,"把模糊想法拆成可验收需求。","确定课程任务管理器目标用户；写 8 条用户故事；为每条写验收条件；划分 MVP 与以后再做","project/docs/requirements.md","哪个需求其实不是 MVP？；验收条件是否能明确判断通过失败？",["github"]),
  day(5,"模块设计与接口",180,"按职责划分 CLI、业务逻辑和数据访问层。","绘制模块依赖图；定义 repository/service/cli 接口；写两个关键流程伪代码；评审耦合点","project/docs/design.md","业务逻辑是否依赖输入输出细节？；数据库替换时哪些模块需要改变？",["py"]),
  day(5,"Issue、里程碑与分支策略",150,"用 GitHub 管理项目而不是只存代码。","创建 v0.1 milestone；拆分 10～15 个 issue；添加标签和验收条件；建立 feature branch 规则","结构化 GitHub 项目看板","issue 是否能在半天内完成？；依赖关系是否写清楚？",["github","git"]),
  day(5,"GitHub Actions 持续集成",180,"理解每次 push/PR 自动验证代码的价值。","完成 Actions Quickstart；配置安装依赖和 pytest；制造失败测试观察日志；修复并添加状态徽章","通过的 CI workflow","本地通过而 CI 失败可能因为什么？；自动化检查应阻止哪些改动合并？",["actions"]),
  day(5,"周复盘：项目开工评审",120,"在编码前确认需求、设计和任务拆分足够清楚。","从零口述项目；检查 schema、设计图和 issue；调整过大的任务；确定下周每日目标","week5-review.md 和 v0.1 milestone","最大技术风险是什么？；若只剩一周，必须保留哪些功能？",["sqlite","actions"]),

  day(6,"项目骨架与数据库连接",180,"建立可运行、可测试的项目最小骨架。","创建 src/tests 结构；实现数据库初始化；配置 CLI 入口；添加健康检查测试","项目可安装并执行 --help","最小闭环是否已经跑通？；初始化重复执行是否安全？",["packaging","sqlite"]),
  day(6,"课程管理功能",180,"完成课程的新增、查看、修改和删除。","实现 repository；实现 service 校验；添加 CLI 命令；覆盖正常与重复课程测试","课程 CRUD PR","哪层负责校验课程名称？；删除课程会影响哪些数据？",["pytest","sqlite"]),
  day(6,"任务管理功能",195,"围绕截止日期建立任务核心流程。","实现任务 CRUD；检查日期格式；支持标记完成；测试不存在课程和非法日期","任务 CRUD PR","日期应以什么格式存储？；领域规则是否散落在 CLI？",["pytest","sqlite"]),
  day(6,"查询、筛选与排序",180,"让用户快速找到今天、逾期和即将到期的任务。","实现按课程/状态筛选；按截止日期排序；添加 overdue/today 命令；为边界日期写测试","查询功能 PR","今天的边界如何定义？；SQL 排序还是 Python 排序更合适？",["sqlite","pytest"]),
  day(6,"学习记录与统计",195,"记录投入时间并计算简单趋势。","实现学习 session；按课程汇总时长；显示七日统计；校验负数和超长记录","统计功能 PR","统计指标能帮助什么决策？；缺失数据如何呈现才不误导？",["sqlite","pytest"]),
  day(6,"导入导出与备份",180,"让用户能够迁移和恢复自己的数据。","实现 CSV 导入导出；导入前校验字段；增加 dry-run；测试重复和损坏文件","安全的 import/export PR","如何避免半导入状态？；导出文件是否足以恢复？",["py","pytest"]),
  day(6,"周复盘：完成 CLI MVP",150,"从真实用户角度完整走一遍核心流程。","清空环境重新安装；录入一周课程和任务；记录所有摩擦点；修复 P0/P1 问题；发布 v0.1.0","可用 CLI MVP 与演示记录","哪些功能看似完成但实际难用？；下周优先提升体验还是加功能？",["github"]),

  day(7,"重构与技术债清理",180,"在继续扩展前降低重复和耦合。","运行测试确保基线；寻找重复代码和过长函数；分小提交重构；确认行为不变","refactor PR 与技术债清单","重构前后哪项指标改善？；有没有为抽象而抽象？",["pytest","git"]),
  day(7,"FastAPI 基础与第一个接口",195,"理解 HTTP、路由、请求、响应和自动文档。","学习 FastAPI 前几节；创建 app；实现 /health 和课程列表；查看 /docs；写接口测试","可运行 API 骨架","HTTP 接口与 CLI 调用业务层有何共同点？；哪些逻辑不能写进路由？",["fastapi"]),
  day(7,"课程与任务 REST API",210,"为核心实体设计一致的 API。","实现课程/任务增删改查；定义请求响应模型；使用正确状态码；覆盖非法输入测试","REST API PR","资源 URL 是否以名词表达？；404、400、422 应如何区分？",["fastapi","pytest"]),
  day(7,"分页、筛选与错误响应",195,"让 API 在数据增多后仍然清晰可用。","加入分页参数；复用筛选逻辑；统一错误格式；限制参数范围；测试空结果","查询 API PR","默认分页大小为何这样选？；错误响应能否被前端稳定处理？",["fastapi"]),
  day(7,"安全与配置基础",165,"认识密钥、输入验证、CORS 和最小权限。","检查仓库中是否有密钥；使用环境变量；补 .env.example；配置合理 CORS；阅读依赖安全提示","SECURITY.md 与安全检查清单","哪些信息绝不能提交？；用户输入在哪些边界必须验证？",["fastapi","github"]),
  day(7,"完善测试金字塔",195,"平衡单元测试、集成测试和少量端到端测试。","统计现有测试类型；补核心 service 单测；补数据库/API 集成测试；删除低价值重复测试","稳定的完整测试套件","哪个失败最可能被测试遗漏？；测试速度和可信度如何平衡？",["pytest"]),
  day(7,"周复盘：邀请真实试用",150,"通过外部反馈发现作者视角看不到的问题。","准备 5 分钟使用任务；邀请一名同学试用但不提示；记录卡点；创建 issue；修复最严重问题","usability-test.md 与反馈 issue","用户在哪一步犹豫最久？；是文档问题、交互问题还是程序错误？",["github"]),

  day(8,"README 与快速开始",180,"让陌生人在十分钟内安装并运行项目。","重写项目介绍；提供复制可用安装命令；加入示例和截图；让干净环境验证 Quick Start","完整 README.md","README 首屏是否说明价值？；命令是否经过逐条验证？",["github"]),
  day(8,"架构与开发文档",180,"记录关键设计，使未来维护者理解选择原因。","画架构图；说明目录职责、数据库模型和测试方式；记录三个架构决策；补贡献指南","docs/architecture.md 与 CONTRIBUTING.md","哪些决策不写下来最容易被误解？；文档与代码是否一致？",["github"]),
  day(8,"日志、错误体验与边界检查",180,"系统性处理失败场景。","测试空数据库、损坏文件、重复数据和中断；改进错误提示；确保日志不泄露敏感信息","edge-cases.md 与修复 PR","错误信息是否告诉用户下一步？；还有哪个失败场景未覆盖？",["pytest"]),
  day(8,"发布准备与许可证",150,"理解版本号、变更日志、许可证和发布包。","选择许可证；整理 CHANGELOG；更新版本号；构建并本地安装发布包；创建 release checklist","LICENSE、CHANGELOG 和候选版本","本次版本有哪些破坏性变化？；许可证为何适合此项目？",["licenses","packaging"]),
  day(8,"发布 v1.0.0",180,"完成一次真实的软件发布流程。","确保 CI 全绿；关闭或延期 issue；创建 Git tag 和 GitHub Release；附安装说明与演示素材","GitHub Release v1.0.0","发布过程哪一步最容易遗漏？；用户怎样报告问题？",["actions","github"]),
  day(8,"成果展示与技术讲解",180,"训练清晰讲述需求、设计、权衡和问题解决过程。","制作 5～8 页项目介绍；录制 5 分钟演示；准备三个技术难点和一个失败案例；模拟答辩","demo 视频/幻灯片与答辩提纲","能否不用术语解释项目？；最能体现成长的证据是什么？",["github"]),
  day(8,"总复盘与大二衔接",150,"把八周经验转化为下学期可持续习惯。","统计完成率和投入；整理技能雷达；写 1000 字复盘；列出大二前三个月目标；归档仓库","summer-retrospective.md 与下一阶段路线图","八周前后最大的能力变化是什么？；今后每周要保留哪三个习惯？",["missing","cs50p"]),
];

export const weekNames = [
  "终端与 Shell", "Git 与工具链", "Python 基础", "Python 工程化",
  "软件工程与数据库", "CLI 项目 MVP", "API 与质量", "发布与总复盘"
];
