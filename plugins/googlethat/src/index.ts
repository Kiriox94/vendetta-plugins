import { commands } from "@vendetta";
import { findByProps } from "@vendetta/metro";

const MessageActions = findByProps("sendMessage", "receiveMessage");
const baseLink = "https://letmegooglethat.com/?q="

let patches = [];

export default {
    onLoad: () => {
        patches.push(commands.registerCommand({
            name: "googlethat",
            displayName: "googlethat",
            description: "Send google that link",
            displayDescription: "Send google that link",
            options: [{
                name: "search",
                displayName: "search",
                description: "Search subject",
                displayDescription: "Search subject",
                required: true,
                // @ts-ignore
                type: 3
            }],
            // @ts-ignore
            applicationId: -1,
            inputType: 1,
            type: 1,
        
            execute: (args, ctx) => {
                MessageActions.sendMessage(ctx.channel.id, {
                    content: baseLink + args[0].value.replaceAll(" ", "+")
                })
            }
        }));
    },
    onUnload: () => {
        for (const unpatch of patches) unpatch()
    }
}