import { Server } from '@modelcontextprotocol/server';
import { StdioServerTransport } from '@modelcontextprotocol/server/stdio';

const server = new Server(
  {
    name: 'fus-mcp-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
      resources: {},
    },
  }
);

// 预留：后续添加tools和resources
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Fus MCP Server running on stdio');
}

main().catch(console.error);
