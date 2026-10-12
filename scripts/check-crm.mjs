import nextEnv from "@next/env";
const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());
const response = await fetch("http://localhost:3016/api/crm/auth/login", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({
    email: process.env.CRM_ADMIN_EMAIL,
    password: process.env.CRM_ADMIN_PASS,
  }),
});
const cookie = response.headers.get("set-cookie")?.split(";")[0];
if (!cookie) {
  console.log(JSON.stringify({ login: response.status, read: "not attempted" }));
  process.exitCode = 1;
} else {
  const read = await fetch("http://localhost:3016/api/crm/leads", { headers: { cookie } });
  const body = await read.json();
  console.log(
    JSON.stringify({
      login: response.status,
      read: read.status,
      shape: Array.isArray(body) ? "array" : typeof body,
    }),
  );
  if (read.status !== 200) process.exitCode = 1;
}
