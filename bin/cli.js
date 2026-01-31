#!/usr/bin/env node

const os = require('os');
const path = require('path');

const MCP_URL = 'https://mcp.quotewise.io/';

const configs = {
  'claude-desktop': {
    name: 'Claude Desktop',
    config: {
      mcpServers: {
        quotewise: {
          url: MCP_URL
        }
      }
    },
    paths: {
      darwin: path.join(os.homedir(), 'Library/Application Support/Claude/claude_desktop_config.json'),
      win32: path.join(process.env.APPDATA || '', 'Claude/claude_desktop_config.json'),
      linux: path.join(os.homedir(), '.config/claude/claude_desktop_config.json')
    }
  },
  'cursor': {
    name: 'Cursor',
    config: {
      mcpServers: {
        quotewise: {
          url: MCP_URL
        }
      }
    },
    instructions: 'Settings → Cursor Settings → MCP Servers → Add Server'
  },
  'vscode': {
    name: 'VS Code (with MCP extension)',
    config: {
      mcpServers: {
        quotewise: {
          url: MCP_URL
        }
      }
    },
    instructions: 'Add to your MCP extension settings'
  },
  'openai': {
    name: 'ChatGPT / OpenAI',
    config: {
      mcpServers: {
        quotewise: {
          url: MCP_URL
        }
      }
    },
    instructions: 'Add via ChatGPT MCP settings or API configuration'
  },
  'gemini': {
    name: 'Gemini CLI',
    config: {
      mcpServers: {
        quotewise: {
          transport: 'http',
          url: MCP_URL
        }
      }
    },
    instructions: 'Add to ~/.gemini/settings.json'
  },
  'generic': {
    name: 'Generic MCP Client',
    config: {
      mcpServers: {
        quotewise: {
          url: MCP_URL
        }
      }
    }
  }
};

function printHeader() {
  console.log(`
╔═══════════════════════════════════════════════════════════════╗
║                   🔮 Quotewise MCP Setup                       ║
║         Semantic quote search for AI assistants                ║
╚═══════════════════════════════════════════════════════════════╝
`);
}

function printConfig(clientKey) {
  const client = configs[clientKey] || configs['generic'];
  
  console.log(`📱 ${client.name}\n`);
  console.log('Add this to your MCP configuration:\n');
  console.log('─'.repeat(60));
  console.log(JSON.stringify(client.config, null, 2));
  console.log('─'.repeat(60));
  
  if (client.paths) {
    const configPath = client.paths[process.platform];
    if (configPath) {
      console.log(`\n📁 Config file location:`);
      console.log(`   ${configPath}`);
    }
  }
  
  if (client.instructions) {
    console.log(`\n📝 Instructions:`);
    console.log(`   ${client.instructions}`);
  }
}

function printFooter() {
  console.log(`
═══════════════════════════════════════════════════════════════

🆓 Anonymous access: 20 requests/hour (no signup needed)
🔑 Get API key for more: https://quotewise.io/developers/dashboard/

📚 Full docs: https://quotewise.io/developers/mcp/
🤖 13 tools: quotes_about, quotes_by, who_said, and more

Need help? q@quotewise.io
`);
}

function printUsage() {
  console.log(`
Usage: npx @quotewise/mcp [command] [client]

Commands:
  setup [client]    Show configuration for a specific client
  list              List all supported clients
  help              Show this help message

Clients:
  claude-desktop    Claude Desktop app
  cursor            Cursor IDE
  vscode            VS Code with MCP extension
  openai            ChatGPT / OpenAI
  gemini            Gemini CLI
  generic           Generic MCP client (default)

Examples:
  npx @quotewise/mcp setup
  npx @quotewise/mcp setup claude-desktop
  npx @quotewise/mcp setup cursor
`);
}

function listClients() {
  console.log('\nSupported MCP Clients:\n');
  Object.entries(configs).forEach(([key, client]) => {
    console.log(`  ${key.padEnd(20)} ${client.name}`);
  });
  console.log('\nUsage: npx @quotewise/mcp setup <client>\n');
}

// Main
const args = process.argv.slice(2);
const command = args[0] || 'setup';
const clientArg = args[1] || 'generic';

printHeader();

switch (command) {
  case 'setup':
    printConfig(clientArg);
    printFooter();
    break;
  case 'list':
    listClients();
    break;
  case 'help':
  case '--help':
  case '-h':
    printUsage();
    break;
  default:
    // Assume it's a client name for setup
    if (configs[command]) {
      printConfig(command);
      printFooter();
    } else {
      printConfig('generic');
      printFooter();
    }
}
