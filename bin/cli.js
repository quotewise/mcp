#!/usr/bin/env node

const os = require('os');
const path = require('path');

const MCP_URL = 'https://mcp.quotewise.io/';

const configs = {
  'claude-code': {
    name: 'Claude Code',
    cliCommand: `claude mcp add --transport http quotewise ${MCP_URL}`,
    instructions: 'Verify with: claude mcp list'
  },
  'claude-desktop': {
    name: 'Claude Desktop',
    config: {
      mcpServers: {
        quotewise: {
          command: 'npx',
          args: ['-y', 'mcp-remote', MCP_URL]
        }
      }
    },
    paths: {
      darwin: path.join(os.homedir(), 'Library/Application Support/Claude/claude_desktop_config.json'),
      win32: path.join(process.env.APPDATA || '', 'Claude/claude_desktop_config.json'),
      linux: path.join(os.homedir(), '.config/Claude/claude_desktop_config.json')
    },
    note: 'Claude Desktop requires the mcp-remote bridge for remote servers (requires Node.js).'
  },
  'chatgpt': {
    name: 'ChatGPT Desktop',
    instructions: [
      'Settings > Connectors > Advanced > enable Developer Mode',
      `Click Create and enter: ${MCP_URL}`,
      'In each new chat: + > More > Developer Mode to activate'
    ].join('\n   ')
  },
  'codex': {
    name: 'Codex CLI',
    cliCommand: `codex mcp add quotewise --url ${MCP_URL}`,
    instructions: 'Verify with: codex mcp list'
  },
  'gemini': {
    name: 'Gemini CLI',
    cliCommand: `gemini mcp add --transport http quotewise ${MCP_URL}`,
    config: {
      mcpServers: {
        quotewise: {
          httpUrl: MCP_URL
        }
      }
    },
    instructions: 'Or add to ~/.gemini/settings.json'
  },
  'generic': {
    name: 'Other MCP Clients',
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
║                   Quotewise MCP Setup                        ║
║         Semantic quote search for AI assistants               ║
╚═══════════════════════════════════════════════════════════════╝
`);
}

function printConfig(clientKey) {
  const client = configs[clientKey] || configs['generic'];

  console.log(`  ${client.name}\n`);

  if (client.cliCommand) {
    console.log('Run this command:\n');
    console.log('  ' + client.cliCommand);
    if (client.config) {
      console.log('');
    }
  }

  if (client.config) {
    if (client.cliCommand) {
      console.log('Or add this to your config:\n');
    } else {
      console.log('Add this to your MCP configuration:\n');
    }
    console.log('─'.repeat(60));
    console.log(JSON.stringify(client.config, null, 2));
    console.log('─'.repeat(60));
  }

  if (client.configText) {
    console.log('');
    console.log('─'.repeat(60));
    console.log(client.configText);
    console.log('─'.repeat(60));
  }

  if (client.paths) {
    const configPath = client.paths[process.platform];
    if (configPath) {
      console.log(`\n  Config file location:`);
      console.log(`   ${configPath}`);
    }
  }

  if (client.instructions) {
    console.log(`\n  ${client.instructions}`);
  }

  if (client.note) {
    console.log(`\n  Note: ${client.note}`);
  }
}

function printFooter() {
  console.log(`
═══════════════════════════════════════════════════════════════

Anonymous access: 20 requests/day (no signup needed)
Create a free account for higher limits: https://quotewise.io/signup/

Full docs: https://quotewise.io/developers/mcp/
18 tools: quotes_about, quotes_by, who_said, collections, and more

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
  claude-code       Claude Code CLI
  claude-desktop    Claude Desktop app
  chatgpt           ChatGPT Desktop
  codex             Codex CLI (OpenAI)
  gemini            Gemini CLI
  generic           Other MCP clients (default)

Examples:
  npx @quotewise/mcp setup
  npx @quotewise/mcp setup claude-code
  npx @quotewise/mcp setup claude-desktop
  npx @quotewise/mcp setup gemini
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
