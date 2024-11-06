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
                    type: 'shop',
                    products: [
                        {
                            product: 'sailboat',
                            price: '€29',
                            dimensions: '±15cm × ±5cm × ±15cm ',
                            image: 'sailboat.svg'
                        },
                        {
                            product: 'inlandVessel',
                            price: '€24',
                            dimensions: '±20cm × ±5cm × ±7cm ',
                            image: 'inland-vessel.svg'
                        },
                        {
                            product: 'containerShip',
                            price: '€24',
                            dimensions: '±15cm × ±7cm × ±10cm ',
                            image: 'container-ship.svg'
                        },
                        {
                            product: 'speedboat',
                            price: '€19',
                            dimensions: '±10cm × ±5cm × ±7cm ',
                            image: 'speedboat.svg'
                        }
                    ]
                },
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
            thumbnail: 'thumbnail.jpg',
            components: [
                {
                    type: 'images',
                    small: false,
                    images: [
                        {
                            src: 'information-board.jpg',
                            alt: 'Foto van het informatiebord.',
                            aspectRatio: '3 / 4'
                        },
                        {
                            src: 'tag-back.jpg',
                            alt: 'Foto van de achterkant van het kaartje.',
                            aspectRatio: '3 / 4'
                        },
                        {
                            src: 'tag-front.jpg',
                            alt: 'Foto van de voorkant van het kaartje.',
                            aspectRatio: '3 / 4'
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
                            src: 't-shirts.jpg',
                            alt: 'Foto van enkele t-shirts aan het kledingrek.',
                            aspectRatio: '3 / 4'

                        },
                        {
                            src: 't-shirts-closeup.jpg',
                            alt: 'Close-up van een tekening.',
                            aspectRatio: '3 / 4'

                        },
                    ]
                },
                {
                    type: 'images',
                    small: false,
                    images: [
                        {
                            src: 'drawing-mirror.jpg',
                            alt: 'Illustratie van de douche, opschrift: \'hoe ik mezelf in de spiegel zie\'.',
                            autoHeight: true
                        },
                        {
                            src: 'drawing-douche.jpg',
                            alt: 'Illustratie van de douche, opschrift: \'hoe een douche mij kopzorgen geeft\'.',
                            autoHeight: true
                        }
                    ]
                }, {
                    type: 'images',
                    small: false,
                    images: [
                        {
                            src: 'drawing-pants.jpg',
                            alt: 'Illustratie van de broeken, opschrift: \'wanneer iedere broek een driekwartsbroek wordt\'.',
                            autoHeight: true
                        },
                        {
                            src: 'drawing-bed.jpg',
                            alt: 'Illustratie van het bed, opschrift: \'waarom ik koudvoetig door het leven ga\'.',
                            autoHeight: true
                        },
                        {
                            src: 'drawing-bus.jpg',
                            alt: 'Illustratie van het openbaar vervoer, opschrift: \'wanneer een beetje yoga geen kwaad kan\'.',
                            autoHeight: true
                        },
                    ]
                },
            ]
        },
        {
            id: 4,
            tags: [{name: 'tags.dataVis'}, {name: 'tags.creativeCoding'}, {name: 'tags.mind'}],
            link: 'summiting-success',
            thumbnail: 'thumbnail.jpg',
            components: [
                {
                    type: 'link',
                    link: 'https://summiting-success.herman-verhelst.be',
                    image: {
                        src: 'homepage.jpg',
                        alt: 'Screenshot van de hoofdpagina van Summiting Success.'
                    }
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
                            src: 'sorting.jpg',
                            alt: 'Screenshot van de sorteeropties.',
                            aspectRatio: '4 / 3'
                        },
                        {
                            src: 'filters.jpg',
                            alt: 'Screenshot van de filters.',
                            aspectRatio: '4 / 3'
                        },
                        {
                            src: 'filtered.jpg',
                            alt: 'Screenshot van een gefilterde lijst van resultaten.',
                            aspectRatio: '4 / 3'
                        },
                    ]
                },
                {
                    type: 'image-full-screen',
                    image: {
                        autoHeight: true,
                        src: 'homepage-extra-information.jpg',
                        alt: 'Mockup van de hoofdpagina en de hoofdpagina waar extra informatie over de editie zichtbaar is.'
                    },
                }
            ]
        },
        {
            id: 5,
            tags: [{name: 'tags.dataVis'}, {name: 'tags.mind'}],
            link: 'moving-water',
            thumbnail: 'thumbnail.png',
            components: [
                {
                    type: 'text',
                    text: 'description',
                    title: false,
                },
                {
                    type: 'videos',
                    videos: [
                        {
                            src: 'dam.mp4',
                        },
                        {
                            src: 'hydro.mp4',
                        },
                        {
                            src: 'lock.mp4',
                        },
                    ]
                },
                {
                    type: 'images',
                    small: false,
                    images: [
                        {
                            src: 'help-touch.jpg',
                            alt: 'Screenshot van de helpfunctie',
                            aspectRatio: '4 / 3'
                        },
                        {
                            src: 'help-swipe.jpg',
                            alt: 'Screenshot van de helpfunctie',
                            aspectRatio: '4 / 3'
                        },
                        {
                            src: 'help-tap.jpg',
                            alt: 'Screenshot van de helpfunctie',
                            aspectRatio: '4 / 3'
                        },
                    ]
                },
                {
                    type: 'images',
                    small: false,
                    images: [
                        {
                            src: 'info.jpg',
                            alt: 'Screenshot van een informatiescherm',
                            aspectRatio: '4 / 3'
                        },
                        {
                            src: 'simple.jpg',
                            alt: 'Screenshot van een informatiescherm',
                            aspectRatio: '4 / 3'
                        },
                        {
                            src: 'minimap.jpg',
                            alt: 'Screenshot van een informatiescherm',
                            aspectRatio: '4 / 3'
                        },
                    ]
                },
            ]
        },
        {
            id: 8,
            tags: [{name: 'tags.creativeCoding'}, {name: 'tags.mind'}],
            link: 'pixels',
            thumbnail: 'thumbnail.jpg',
            components: [
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
                            src: 'patterns-red.jpg',
                            alt: 'Foto van patronenspel in het SCL.',
                        },
                        {
                            src: 'patterns-white.jpg',
                            alt: 'Foto van patronenspel in het SCL.',
                        },
                    ]
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