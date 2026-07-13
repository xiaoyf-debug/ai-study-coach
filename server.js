import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';

const port = Number(process.env.PORT || 4173);
const root = join(process.cwd(), 'public');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8' };

async function readJson(request) {
  let body = '';
  for await (const chunk of request) body += chunk;
  return JSON.parse(body || '{}');
}

async function askOpenAI(payload) {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL;
  if (!apiKey || !model) return null;

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      instructions: '你是一名严谨、鼓励式的中文学习教练。根据用户目标、可用时间和学习记录，给出具体可执行的计划或复盘建议。避免空泛鼓励，不虚构完成情况。',
      input: JSON.stringify(payload),
    }),
  });
  if (!response.ok) throw new Error(`OpenAI API 请求失败：${response.status}`);
  const data = await response.json();
  return data.output_text || null;
}

const server = createServer(async (request, response) => {
  try {
    if (request.method === 'POST' && request.url === '/api/coach') {
      const payload = await readJson(request);
      const text = await askOpenAI(payload);
      response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      response.end(JSON.stringify({ mode: text ? 'ai' : 'local', text }));
      return;
    }

    const pathname = request.url === '/' ? '/index.html' : request.url.split('?')[0];
    const file = await readFile(join(root, pathname));
    response.writeHead(200, { 'Content-Type': types[extname(pathname)] || 'application/octet-stream' });
    response.end(file);
  } catch (error) {
    response.writeHead(error.code === 'ENOENT' ? 404 : 500, { 'Content-Type': 'application/json; charset=utf-8' });
    response.end(JSON.stringify({ error: error.message }));
  }
});

server.listen(port, () => console.log(`AI 学习助手：http://localhost:${port}`));
