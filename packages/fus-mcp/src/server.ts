// MCP服务器预留
// 后续将添加对@modelcontextprotocol/sdk的集成

export interface McpServerConfig {
  name: string;
  version: string;
}

export class McpServer {
  private config: McpServerConfig;

  constructor(config: McpServerConfig) {
    this.config = config;
  }

  async start(): Promise<void> {
    console.error(`Fus MCP Server (${this.config.name} v${this.config.version}) running on stdio`);
  }
}

// 预留：后续添加tools和resources
async function main() {
  const server = new McpServer({
    name: 'fus-mcp-server',
    version: '1.0.0',
  });
  await server.start();
}

main().catch(console.error);
