/**
 * Tool profile (see `config/registry.ts`). A leaf module: the domains whose defaults it
 * changes (`eval/settings.ts`, `lsp/settings.ts`, `tools/settings.ts`) import it, so it must
 * not import them back.
 */
import { type ConditionalDefault, register } from "../config/registry";

export const cfgToolsProfile = register({
	id: "tools.profile",
	type: "enum",
	values: ["lean", "full"] as const,
	default: "lean",
	env: "PI_TOOLS_PROFILE",
	ui: {
		tab: "tools",
		group: "Available Tools",
		label: "Tool Profile",
		description:
			"Lean turns off default-on extras (eval, LSP, debug, AST edit, semantic find, Auto QA) and trims the system prompt's delivery rules; explicitly configured settings still win",
		options: [
			{
				value: "lean",
				label: "Lean",
				description:
					"Core tools (read, bash, edit, write, grep, glob), todo, ask, web search, subagents and messaging",
			},
			{ value: "full", label: "Full", description: "Every default-on built-in tool and the full system prompt" },
		],
	},
});

/** Whether the lean tool profile is active. */
export const cfgLeanTools = cfgToolsProfile.map(profile => profile === "lean");

/** Conditional default applied while the lean tool profile is active and the setting is unconfigured. */
export function leanDefault<const T>(value: T): ConditionalDefault<T> {
	return { when: cfgLeanTools, value };
}
