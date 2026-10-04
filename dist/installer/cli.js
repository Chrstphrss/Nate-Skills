#!/usr/bin/env node
import * as process from 'node:process';
import { printBanner } from './ui/banner.js';
import { color, symbols } from './ui/theme.js';
import { promptSelect, promptMultiSelect, CliCancelledError } from './ui/prompts.js';
import { getAllSkills, getSkill } from './core/registry.js';
import { getAllPresetNames, getPresetSkills } from './presets/index.js';
import { getAllAgentAdapters, getAgentAdapter } from './agents/index.js';
import { executeInstall } from './core/installer.js';
import { executeUpdate } from './core/updater.js';
import { validateInstallation } from './core/validator.js';
function parseArgs(args) {
    const result = {
        help: false,
        version: false,
        list: false,
        project: false,
        global: false
    };
    let i = 0;
    while (i < args.length) {
        const arg = args[i];
        if (arg === '--help' || arg === '-h') {
            result.help = true;
        }
        else if (arg === '--version' || arg === '-v') {
            result.version = true;
        }
        else if (arg === '--list' || arg === '-l') {
            result.list = true;
        }
        else if (arg === '--project') {
            result.project = true;
        }
        else if (arg === '--global') {
            result.global = true;
        }
        else if (arg === '--agent' && i + 1 < args.length) {
            result.agent = args[++i];
        }
        else if (arg === '--preset' && i + 1 < args.length) {
            result.preset = args[++i];
        }
        else if (arg === '--skill' && i + 1 < args.length) {
            result.skill = args[++i];
        }
        else if (arg === '--mode' && i + 1 < args.length) {
            result.mode = args[++i];
        }
        else if (arg === 'update' || arg === 'uninstall' || arg === 'validate' || arg === 'list') {
            result.command = arg;
        }
        i++;
    }
    return result;
}
function printHelp() {
    printBanner();
    console.log(`  Usage:
    npx nate-skills [command] [options]

  Commands:
    update                 Update currently installed skills to latest definitions
    uninstall              Remove Nate Skills configuration and files
    validate               Verify installed skills integrity and agent configuration
    list                   List all available skills and presets

  Options:
    --help, -h             Show this help menu
    --version, -v          Show package version
    --list, -l             List all skills and presets
    --agent <name>         Target agent (antigravity, claude-code, codex, cursor, gemini-cli, opencode, manual)
    --preset <name>        Install a curated preset (minimal, frontend, mobile, backend, full)
    --skill <name>         Install a specific skill by id
    --mode <mode>          Operation mode: during, after, ask (default: during)
    --project              Target local project directory (default)
    --global               Target user home/global agent directory

  Examples:
    npx nate-skills --agent cursor --preset frontend
    npx nate-skills --agent codex --skill anti-bullshit
    npx nate-skills --project --preset full
    npx nate-skills update --agent antigravity
    npx nate-skills validate
`);
}
function printList() {
    printBanner();
    console.log(`  ${color('bold', 'Available Skills:')}`);
    for (const s of getAllSkills()) {
        console.log(`    ${color('cyan', s.id.padEnd(20))} ${color('dim', `[${s.category}]`)} ${s.description}`);
    }
    console.log();
    console.log(`  ${color('bold', 'Presets:')}`);
    for (const p of getAllPresetNames()) {
        const list = getPresetSkills(p) || [];
        console.log(`    ${color('green', p.padEnd(12))} (${list.join(', ')})`);
    }
    console.log();
    console.log(`  ${color('bold', 'Supported Agents:')}`);
    for (const a of getAllAgentAdapters()) {
        console.log(`    ${color('yellow', a.id.padEnd(16))} ${a.name} - ${a.description}`);
    }
    console.log();
}
async function runInteractive() {
    printBanner();
    // Step 1: Select Agent
    const allAdapters = getAllAgentAdapters().filter((a) => a.id !== 'manual');
    const manualAdapter = getAgentAdapter('manual');
    const agentChoices = [...allAdapters, manualAdapter];
    const selectedAgentId = await promptSelect('Select agent', agentChoices.map((a) => ({
        label: a.name,
        value: a.id
    })), 0);
    const adapter = getAgentAdapter(selectedAgentId);
    if (!adapter) {
        console.error(`  ${color('red', symbols.cross)} Unknown agent selected.`);
        process.exit(1);
    }
    // Step 2: Select Preset
    const presetOptions = [
        {
            label: 'Full',
            value: 'full',
            description: 'All 8 skills',
            details: [
                'think-before-code · anti-bullshit · human-ui · responsive-first',
                'ios-ui · security-first · code-cleaner · frugal-token'
            ]
        },
        {
            label: 'Frontend',
            value: 'frontend',
            description: 'UI-focused development',
            details: [
                'think-before-code · anti-bullshit · human-ui · responsive-first',
                'code-cleaner · frugal-token'
            ]
        },
        {
            label: 'Backend',
            value: 'backend',
            description: 'Backend/API-focused development',
            details: [
                'think-before-code · anti-bullshit · security-first',
                'code-cleaner · frugal-token'
            ]
        },
        {
            label: 'Mobile',
            value: 'mobile',
            description: 'Mobile-focused development',
            details: [
                'All 8 skills'
            ]
        },
        {
            label: 'Minimal',
            value: 'minimal',
            description: 'Essential guardrails',
            details: [
                'think-before-code · anti-bullshit · security-first'
            ]
        },
        {
            label: 'Custom',
            value: 'custom',
            description: 'Choose exactly which skills to install'
        }
    ];
    const selectedPreset = await promptSelect('Select preset', presetOptions, 0);
    let customSkills;
    if (selectedPreset === 'custom') {
        const all = getAllSkills();
        customSkills = await promptMultiSelect('Select skills', all.map((s) => ({
            label: s.id,
            value: s.id,
            description: s.description
        })), all.map((s) => s.id));
        if (customSkills.length === 0) {
            console.error(`  ${color('yellow', symbols.warning)} No skills selected.`);
            process.exit(1);
        }
    }
    // Step 3: Select Mode
    const modeChoice = await promptSelect('Select mode', [
        { label: 'During', value: 'during' },
        { label: 'After', value: 'after' },
        { label: 'Ask', value: 'ask' }
    ], 0);
    // Step 4: Select Scope
    const scopeChoice = await promptSelect('Installation scope', [
        { label: 'Project', value: 'project' },
        { label: 'Global', value: 'global' }
    ], 0);
    const isGlobal = scopeChoice === 'global';
    // Step 5: Install
    const ctx = {
        cwd: process.cwd(),
        isGlobal,
        mode: modeChoice
    };
    try {
        const res = await executeInstall({
            adapter,
            ctx,
            skillIds: customSkills,
            preset: selectedPreset === 'custom' ? undefined : selectedPreset
        });
        const presetName = selectedPreset === 'custom'
            ? `Custom (${res.installedSkills.length} skills)`
            : (presetOptions.find((p) => p.value === selectedPreset)?.label || selectedPreset);
        console.log(`  ${color('green', symbols.check)} Nate Skills installed successfully.`);
        console.log(`    Agent:   ${adapter.name}`);
        console.log(`    Preset:  ${presetName}`);
        console.log(`    Skills:  ${res.installedSkills.join(', ')}\n`);
        process.exit(0);
    }
    catch (err) {
        console.error(`  ${color('red', symbols.cross)} Could not configure ${adapter.name}`);
        console.error(`    ${err?.message || 'Existing configuration was preserved.'}`);
        process.exit(1);
    }
}
async function runNonInteractive(args) {
    const ctx = {
        cwd: process.cwd(),
        isGlobal: args.global,
        mode: args.mode || 'during'
    };
    const adapter = args.agent ? getAgentAdapter(args.agent) : getAgentAdapter('manual');
    if (!adapter) {
        console.error(`  ${color('red', symbols.cross)} Unknown agent: ${args.agent}`);
        process.exit(1);
    }
    if (args.command === 'uninstall') {
        try {
            await adapter.uninstall(ctx);
            console.log(`  ${color('green', symbols.check)} Uninstalled Nate Skills from ${adapter.name}`);
            process.exit(0);
        }
        catch (err) {
            console.error(`  ${color('red', symbols.cross)} Could not uninstall from ${adapter.name}`);
            console.error(`    ${err?.message || err}`);
            process.exit(1);
        }
    }
    if (args.command === 'validate') {
        const report = await validateInstallation(adapter, ctx);
        console.log(`  ${color('bold', `Validation for ${adapter.name} (${ctx.isGlobal ? 'global' : 'project'}):`)}`);
        console.log(`  Status: ${report.valid ? color('green', `${symbols.check} VALID`) : color('red', `${symbols.cross} ISSUES FOUND`)}`);
        console.log(`  Installed Skills (${report.skillsPresent.length}): ${report.skillsPresent.join(', ')}`);
        if (report.skillsMissing.length > 0) {
            console.log(`  Missing Skills: ${report.skillsMissing.join(', ')}`);
        }
        if (report.configFilePath) {
            console.log(`  Config File: ${report.configFilePath} [${report.configFilePresent ? 'Found' : 'Missing'}]`);
        }
        if (report.issues.length > 0) {
            console.log('\n  Issues:');
            for (const issue of report.issues) {
                console.log(`    ${color('red', symbols.cross)} ${issue}`);
            }
            process.exit(1);
        }
        process.exit(0);
    }
    if (args.command === 'update') {
        try {
            const updateRes = await executeUpdate(adapter, ctx);
            console.log(`  ${color('green', symbols.check)} Updated ${updateRes.updatedSkills.length} skill(s) for ${adapter.name}`);
            process.exit(0);
        }
        catch (err) {
            console.error(`  ${color('red', symbols.cross)} Could not update ${adapter.name}`);
            console.error(`    ${err?.message || err}`);
            process.exit(1);
        }
    }
    let skillIds;
    if (args.skill) {
        const s = getSkill(args.skill);
        if (!s) {
            console.error(`  ${color('red', symbols.cross)} Unknown skill: ${args.skill}`);
            process.exit(1);
        }
        skillIds = [s.id];
    }
    else if (args.preset) {
        const p = getPresetSkills(args.preset);
        if (!p) {
            console.error(`  ${color('red', symbols.cross)} Unknown preset: ${args.preset}`);
            process.exit(1);
        }
        skillIds = [...p];
    }
    try {
        const res = await executeInstall({
            adapter,
            ctx,
            skillIds,
            preset: args.preset || (skillIds ? undefined : 'full')
        });
        console.log(`  ${color('green', symbols.check)} Installed ${res.installedSkills.length} skill(s) into ${adapter.name}.`);
        process.exit(0);
    }
    catch (err) {
        console.error(`  ${color('red', symbols.cross)} Could not configure ${adapter.name}`);
        console.error(`    ${err?.message || 'Existing configuration was preserved.'}`);
        process.exit(1);
    }
}
async function main() {
    const args = parseArgs(process.argv.slice(2));
    if (args.help) {
        printHelp();
        process.exit(0);
    }
    if (args.version) {
        console.log('nate-skills v1.0.0');
        process.exit(0);
    }
    if (args.list || args.command === 'list') {
        printList();
        process.exit(0);
    }
    const hasSpecificFlags = !!args.agent ||
        !!args.preset ||
        !!args.skill ||
        !!args.mode ||
        !!args.command ||
        args.global ||
        args.project;
    try {
        if (hasSpecificFlags) {
            await runNonInteractive(args);
        }
        else {
            await runInteractive();
        }
    }
    catch (err) {
        if (err instanceof CliCancelledError) {
            console.log(`\n  ${color('dim', 'Cancelled.')}\n`);
            process.exit(0);
        }
        console.error(`\n  ${color('red', symbols.cross)} An error occurred.`);
        process.exit(1);
    }
}
main().catch(() => {
    process.exit(1);
});
