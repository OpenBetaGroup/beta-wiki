---
layout: page
---

<script setup>
import { VPTeamPage, VPTeamPageTitle, VPTeamMembers } from "vitepress/theme";

const members = [
    {
        avatar: "https://avatars.githubusercontent.com/u/23031327",
        name: "Pixel Brush",
        title: "Maintainer",
        links: [
            {
                icon: "github",
                link: "https://github.com/OpenBetaGroup"
            }
        ]
    },
    {
        avatar: "https://avatars.githubusercontent.com/u/86132148",
        name: "mudkip",
        title: "Creator of the Original Wiki",
        links: [
            {
                icon: "github",
                link: "https://github.com/mudkjp"
            }
        ]
    },
    {
        avatar: "https://avatars.githubusercontent.com/u/15125899",
        name: "tomast1337",
        title: "Contributor",
        links: [
            {
                icon: "github",
                link: "https://github.com/tomast1337"
            }
        ]
    },
    {
        avatar: "https://avatars.githubusercontent.com/u/265255269",
        name: "esora512",
        title: "Contributor",
        links: [
            {
                icon: "github",
                link: "https://github.com/esora512"
            }
        ]
    },
    {
        avatar: "https://avatars.githubusercontent.com/u/96804457",
        name: "takeraparterer",
        title: "Contributor",
        links: [
            {
                icon: "github",
                link: "https://github.com/takeraparterer"
            }
        ]
    },
    // add yourself here
];
</script>

<VPTeamPage>
    <VPTeamPageTitle>
        <template #title>
            Credits
        </template>
        <template #lead>
            People who have helped Beta Wiki in some way. You can contribute too!
        </template>
    </VPTeamPageTitle>
    <VPTeamMembers :members />
</VPTeamPage>
