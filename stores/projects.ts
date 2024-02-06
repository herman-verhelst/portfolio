import {defineStore} from "pinia";

export const useProjectsStore = defineStore('projects', () => {
    const projects = ref([
        {
            id: 1,
            title: 'projects.woodenBoxes.title',
            subtitle: 'projects.woodenBoxes.title',
            tags: [{name: 'tags.wood'}, {name: 'tags.dataVis'}],
            link: 'wooden-boxes',
            thumbnail: ''
        },
        {
            id: 2,
            title: 'projects.woodenBoxes.title',
            subtitle: 'projects.woodenBoxes.title',
            tags: [{name: 'tags.wood'}, {name: 'tags.dataVis'}],
            link: 'haha'
        },
    ])

    function filterProjects(link: string) {
        return projects.value.find(project => project.link === link)
    }

    return {projects, filterProjects}
})