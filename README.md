# Quotewise MCP Server

Semantic quote search for AI assistants. Find quotes by meaning, verify attributions, with source transparency via QuoteSightings.

[![npm version](https://img.shields.io/npm/v/@quotewise/mcp.svg)](https://www.npmjs.com/package/@quotewise/mcp)
[![npm downloads](https://img.shields.io/npm/dm/@quotewise/mcp.svg)](https://www.npmjs.com/package/@quotewise/mcp)
[![GitHub repo](https://img.shields.io/github/stars/quotewise/mcp.svg)](https://github.com/quotewise/mcp)

## Quick Setup

Run the setup helper to get config for your client:

```bash
npx @quotewise/mcp setup
npx @quotewise/mcp setup claude-desktop
npx @quotewise/mcp setup gemini
```

Or follow the client-specific instructions below.

## Setup by Client

### Claude Code

```bash
claude mcp add --transport http quotewise https://mcp.quotewise.io/
```

Verify with `claude mcp list` or `/mcp` inside a session.

### Claude Desktop

Add via Settings > Connectors in the app UI, or add to your config file using the `mcp-remote` bridge:

```json
{
  "mcpServers": {
    "quotewise": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.quotewise.io/"]
    }
  }
}
```

| OS | Config Path |
|----|-------------|
| macOS | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Windows | `%APPDATA%\Claude\claude_desktop_config.json` |
| Linux | `~/.config/Claude/claude_desktop_config.json` |

> **Note:** Claude Desktop does not support remote HTTP servers directly in the config file. The `mcp-remote` bridge runs a local stdio process that proxies to the remote server. Requires Node.js.

### ChatGPT

1. Open ChatGPT Desktop > Settings > Connectors > Advanced > enable **Developer Mode**
2. Click **Create** and enter `https://mcp.quotewise.io/` as the MCP server URL
3. In each new chat: click **+** > **More** > **Developer Mode** to activate

Available to Pro, Plus, Business, Enterprise, and Education accounts.

### Codex CLI

Add to `~/.codex/config.toml`:

```toml
[mcp_servers.quotewise]
url = "https://mcp.quotewise.io/"
```

### Gemini CLI

```bash
gemini mcp add --transport http quotewise https://mcp.quotewise.io/
```

Or add to `~/.gemini/settings.json`:

```json
{
  "mcpServers": {
    "quotewise": {
      "httpUrl": "https://mcp.quotewise.io/"
    }
  }
}
```

### Other MCP Clients

Most MCP clients use the standard `mcpServers` format:

```json
{
  "mcpServers": {
    "quotewise": {
      "url": "https://mcp.quotewise.io/"
    }
  }
}
```

## Authentication

**Anonymous access** works immediately — 20 requests/day, no signup needed.

**For higher limits**, [create a free account](https://quotewise.io/signup/) and then generate an API key from your [developer dashboard](https://quotewise.io/developers/dashboard/). The MCP server uses OAuth device flow — you'll be prompted on first use.

See [quotewise.io/plans](https://quotewise.io/plans/) for current rate limits and pricing.

## Tools Available

18 tools for quote discovery, attribution lookup, and collection management:

### Discovery
- `quotes_about` — Semantic search by concept ("courage during setbacks")
- `quotes_by` — Find quotes by a specific person
- `quotes_from` — Find quotes from a specific source/book
- `quotes_like` — Find similar quotes via vector similarity
- `quotes_containing` — Exact phrase search
- `who_said` — Attribution lookup (catches misattributions!)
- `quote` — Get full details for a single quote (by short code)
- `quote_random` — Discover random quotes

### Exploration
- `originators` — Search/browse authors and speakers
- `originators_like` — Find similar authors
- `sources` — Search/browse books, speeches, works
- `quote_relations` — Find related quotes (similar themes, same author, etc.)
- `search_proverbs` — Search proverb database for wise sayings

### Collections (requires auth)
- `collection` — Create, list, update, delete collections
- `collection_quotes` — Add/remove quotes from collections

### Utilities
- `ping` — Health check (test connectivity)
- `auth_status` — Check authentication status and rate limits
- `flag_content` — Flag inappropriate or misattributed quotes
- `propose_edit` — Suggest corrections to quote text or attribution

## Filters

All search tools support powerful filters:

| Filter | Values |
|--------|--------|
| `length` | brief, short, medium, long, passage |
| `max_chars` | 280 (Twitter), 500 (Threads), etc. |
| `structure` | prose, verse, one-liner |
| `language` | "en", "es", "French", etc. |
| `gender` | female, male, non-binary |
| `reading_level` | elementary, middle_school, high_school, college |
| `content_rating` | G, PG, PG-13, R |

## Example Prompts

- "Find me a short quote about persistence for a tweet"
- "What did Einstein actually say about imagination?"
- "Quotes by women about resilience"
- "Who said 'be the change you wish to see'?"
- "Find quotes similar to 'the journey of a thousand miles'"

## Source Transparency

Every quote includes **QuoteSightings** — citations showing where we found it. See sources before you share.

## Troubleshooting

**Connection refused or timeout:** Verify you can reach `https://mcp.quotewise.io/` from your network. Corporate firewalls may block the connection.

**"Rate limit exceeded":** Anonymous access allows 20 requests/day. Sign up at [quotewise.io](https://quotewise.io) for higher limits.

**"Invalid authentication token":** API tokens use the `qw_` prefix. Regenerate your key at [quotewise.io/developers/dashboard](https://quotewise.io/developers/dashboard/).

**Claude Desktop not connecting:** Claude Desktop requires the `mcp-remote` bridge for remote servers. See the [Claude Desktop setup](#claude-desktop) section above.

**Tools not appearing:** After adding the server config, restart your MCP client. Use the `ping` tool to verify connectivity.

## Links

- **Docs**: [quotewise.io/developers/mcp](https://quotewise.io/developers/mcp/)
- **API Reference**: [api.quotewise.io/docs](https://api.quotewise.io/docs/)
- **Web**: [quotewise.io](https://quotewise.io)
- **llms.txt**: [mcp.quotewise.io/llms.txt](https://mcp.quotewise.io/llms.txt)

## Support

- Email: [q@quotewise.io](mailto:q@quotewise.io)
- Issues: [github.com/quotewise/mcp/issues](https://github.com/quotewise/mcp/issues)

## License

MIT © [Quotosaurus LLC](https://quotewise.io)
