# Quotewise MCP Server

Semantic quote search platform. Find quotes by meaning, with source transparency via QuoteSightings.

[![npm version](https://img.shields.io/npm/v/@quotewise/mcp.svg)](https://www.npmjs.com/package/@quotewise/mcp)
[![npm downloads](https://img.shields.io/npm/dm/@quotewise/mcp.svg)](https://www.npmjs.com/package/@quotewise/mcp)
[![GitHub repo](https://img.shields.io/github/stars/quotewise/mcp.svg)](https://github.com/quotewise/mcp)

## Quick Setup

```bash
npx @quotewise/mcp setup
```

This prints the configuration for your MCP client (Claude Desktop, Cursor, VS Code, etc.).

## Manual Configuration

Add to your MCP client config:

```json
{
  "mcpServers": {
    "quotewise": {
      "url": "https://mcp.quotewise.io/"
    }
  }
}
```

### Config File Locations

| Client | Config Path |
|--------|-------------|
| **Claude Desktop (macOS)** | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| **Claude Desktop (Windows)** | `%APPDATA%/Claude/claude_desktop_config.json` |
| **Cursor** | Settings → Cursor Settings → MCP Servers |
| **VS Code** | Depends on MCP extension |

## Authentication

**Anonymous access** works immediately — 20 requests/hour, no signup needed.

**For higher limits**, get an API key:
1. Visit [quotewise.io/developers/mcp](https://quotewise.io/developers/dashboard/)
2. Create an API key
3. The MCP server uses OAuth device flow — you'll be prompted on first use

### Rate Limits

See [quotewise.io/plans](https://quotewise.io/plans/) for current rate limits and pricing.

## Tools Available

Tools for quote discovery, attribution lookup, and collection management:

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

Try these in Claude Desktop or your MCP client:

- "Find me a short quote about persistence for a tweet"
- "What did Einstein actually say about imagination?"
- "Quotes by women about resilience"
- "Who said 'be the change you wish to see'?"
- "Find quotes similar to 'the journey of a thousand miles'"

## Source Transparency

Every quote includes **QuoteSightings** — citations showing where we found it. See sources before you share.

## Links

- **MCP Tools**: [quotewise.io/developers/mcp](https://quotewise.io/developers/mcp/)
- **REST API**: [api.quotewise.io/docs](https://api.quotewise.io/docs/)
- **Web**: [quotewise.io](https://quotewise.io)
- **llms.txt**: [mcp.quotewise.io/llms.txt](https://mcp.quotewise.io/llms.txt)

## Support

- Email: [q@quotewise.io](mailto:q@quotewise.io)
- Issues: [github.com/quotewise/mcp/issues](https://github.com/quotewise/mcp/issues)

## License

MIT © [Quotosaurus LLC](https://quotewise.io)
