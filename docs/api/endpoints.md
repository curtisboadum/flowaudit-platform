# FlowAudit API Endpoints

## Health

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Health check + version info |

## Agents (planned)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/agents` | List all agents |
| POST | `/api/agents` | Create a new agent |
| GET | `/api/agents/[id]` | Get agent details |
| PATCH | `/api/agents/[id]` | Update agent config |
| DELETE | `/api/agents/[id]` | Delete an agent |
| POST | `/api/agents/[id]/invoke` | Trigger an agent run |

## Clients (planned)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/clients` | List all clients |
| POST | `/api/clients` | Create/onboard a client |
| GET | `/api/clients/[id]` | Get client details |
| PATCH | `/api/clients/[id]` | Update client info |

## Workflows (planned)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/workflows` | List all workflows |
| POST | `/api/workflows` | Create a workflow |
| GET | `/api/workflows/[id]` | Get workflow details |
| POST | `/api/workflows/[id]/run` | Execute a workflow |
