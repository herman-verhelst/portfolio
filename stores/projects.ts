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
            link: 'boot-schap',
            thumbnail: 'chisel.jpg',
            components: [
                {
                    type: 'images',
                    small: false,
                    images: [
                        {
                            src: 'overview.jpg',
                            alt: 'Overzichtsfoto van de houten vaartuigen.'
                        },
                        {
                            src: 'overview-detail.jpg',
                            alt: 'Detailfoto van de houten driemaster met de andere vaartuigen op de achtergrond.'
                        },
                    ]
                },
                {
                    type: 'text',
                    text: 'description',
                    title: false,
                },
                {
                    type: 'images',
                    small: false,
                    images: [
                        {
                            src: 'steamboat.jpg',
                            alt: 'Foto van de houten stoomboot.'
                        },
                        {
                            src: 'inland-vessel.jpg',
                            alt: 'Foto van het houten binnenvaartschip.'
                        },
                    ]
                },
                {
                    type: 'image-full-screen',
                    image: {
                        src: 'lathe.jpg',
                        alt: 'Foto van een houten vaartuig op de draaibank.'
                    },
                },
                {
                    type: 'images',
                    small: false,
                    images: [
                        {
                            src: 'sailboat.jpg',
                            alt: 'Foto van de houten zeilboot.'
                        },
                        {
                            src: 'three-master.jpg',
                            alt: 'Foto van de houten driemaster.'
                        },
                    ]
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
                },
                {
                    type: 'text',
                    text: 'description',
                    title: false,
                },
            ]
        },
        {
            id: 5,
            tags: [{name: 'tags.wood'}, {name: 'tags.dataVis'}, {name: 'tags.mind'}],
            link: 'network',
            thumbnail: 'PXL_20240122_092227937_1.jpg',
            components: [
                {
                    type: 'text',
                    text: 'description',
                    title: false,
                },
            ]
        },
        {
            id: 6,
            tags: [{name: 'tags.web'}, {name: 'tags.creativeCoding'}, {name: 'tags.mind'}],
            link: 'cycling',
            thumbnail: 'thumbnail.png',
            components: [
                {
                    type: 'text',
                    text: 'description',
                    title: false,
                },
            ]
        },
        {
            id: 7,
            tags: [{name: 'tags.print'}, {name: 'tags.mind'}],
            link: 'twice-burned-library',
            thumbnail: 'PXL_20240122_092939181_1.jpg',
            components: [
                {
                    type: 'text',
                    text: 'description',
                    title: false,
                },
            ]
        },
        {
            id: 8,
            tags: [{name: 'tags.creativeCoding'}, {name: 'tags.mind'}],
            link: 'pixels',
            thumbnail: 'PXL_20240122_092939181_1.jpg',
            components: [
                {
                    type: 'text',
                    text: 'description',
                    title: false,
                },
            ]
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