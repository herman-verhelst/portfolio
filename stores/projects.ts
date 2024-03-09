import {defineStore} from "pinia";

export const useProjectsStore = defineStore('projects', () => {
    const projects = ref([
        {
            id: 1,
            tags: [{name: 'tags.wood'}, {name: 'tags.dataVis'}, {name: 'tags.mind'}],
            link: 'wooden-boxes',
            thumbnail: 'IMG_0062.jpeg',
            components: [
                {
                    type: 'images',
                    small: false,
                    images: [
                        {
                            src: 'IMG_0009.jpeg',
                            alt: ''
                        },
                        {
                            src: 'IMG_0033.jpeg',
                            alt: ''
                        }
                    ]
                },
                {
                    type: 'text',
                    text: 'description',
                    title: false,
                },
                {
                    type: 'image-full-screen',
                    image: {
                        src: 'IMG_0056.jpeg',
                        alt: ''
                    }
                },
                {
                    type: 'images',
                    small: true,
                    images: [
                        {
                            src: 'IMG_0015.jpeg',
                            alt: ''
                        },
                        {
                            src: 'IMG_0050.jpeg',
                            alt: ''
                        },
                        {
                            src: 'IMG_0045.jpeg',
                            alt: ''
                        }
                    ]
                },
                {
                    type: 'image-full-screen',
                    image: {
                        src: 'IMG_0060.jpeg',
                        alt: ''
                    }
                }
            ]
        },
        {
            id: 2,
            tags: [{name: 'tags.wood'}, {name: 'tags.personal'}],
            link: 'woodwork',
            thumbnail: 'IMG_3130.jpeg',
            components: [
                {
                    type: 'text',
                    text: 'description',
                    title: false,
                },
            ]
        },
        {
            id: 3,
            tags: [{name: 'tags.wood'}, {name: 'tags.dataVis'}, {name: 'tags.mind'}],
            link: 't-shirts',
            thumbnail: 'PXL_20240122_094658383_1.jpg',
            components: [
                {
                    type: 'text',
                    text: 'description',
                    title: false,
                },
            ]
        },
        {
            id: 4,
            tags: [{name: 'tags.dataVis'}, {name: 'tags.creativeCoding'}, {name: 'tags.mind'}],
            link: 'summiting-success',
            thumbnail: 'thumbnail.png',
            components: [
                {
                    type: 'link',
                    link: 'https://summiting-success.herman-verhelst.be',
                    image: {
                        src: 'frontpage.png',
                        alt: ''
                    }
                }
            ]
        },
        {
            id: 5,
            tags: [{name: 'tags.wood'}, {name: 'tags.dataVis'}, {name: 'tags.mind'}],
            link: 'network',
            thumbnail: 'PXL_20240122_092227937_1.jpg',
            components: []
        },
        {
            id: 6,
            tags: [{name: 'tags.web'}, {name: 'tags.creativeCoding'}, {name: 'tags.mind'}],
            link: 'cycling',
            thumbnail: 'thumbnail.png',
            components: []
        },
        {
            id: 7,
            tags: [{name: 'tags.print'}, {name: 'tags.mind'}],
            link: 'twice-burned-library',
            thumbnail: 'PXL_20240122_092939181_1.jpg',
            components: []
        }
    ])

    function findProjectByLink(link: string) {
        return projects.value.find(project => project.link === link)
    }

    function findProjectById(id: number) {
        return projects.value.find(project => project.id === id)
    }

    return {projects, findProjectByLink, findProjectById}
})