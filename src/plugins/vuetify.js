import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const myCustomLightTheme = {
    dark: false,
    colors: {
        background: '#E7ECEF',
        surface: '#FFFFFF',
        accent: '#d1d1d1',
        'surface-bright': '#FFFFFF',
        'surface-light': '#F5F5F5',
        'surface-variant': '#EEEEEE',
        'on-surface-variant': '#757575',

        primary: '#2A85FF',
        'primary-darken-1': '#1C59AA',
        secondary: '#48A9A6',
        'secondary-darken-1': '#018786',

        error: '#B00020',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',

        headingColor: '#3e5677',
        numberColor: '#0e2c55',
        subheadingColor: 'rgb(69, 69, 69)',
        iconColor: '#95C2FF',
        cardBg: '#ffffff',
        cardBorder: '#000',
        cardTitle: 'rgb(62, 86, 119)',
        cardValue: '#0e2c55',
    },
}

const myCustomDarkTheme = {
    dark: true,
    colors: {
        background: '#0A1A2F',
        surface: '#112240',
        accent: '#334866',
        'surface-bright': '#1C2D4A',
        'surface-light': '#243B5A',
        'surface-variant': '#334866',
        'on-surface-variant': '#B0BEC5',

        primary: '#95C2FF',
        'primary-darken-1': '#4A90E2',
        secondary: '#48A9A6',
        'secondary-darken-1': '#3dd2cf',

        error: '#CF6679',
        info: '#64B5F6',
        success: '#81C784',
        warning: '#FFB74D',

        headingColor: '#C3D4EC',
        numberColor: '#E0F2FF',
        subheadingColor: '#90A4AE',
        iconColor: '#95C2FF',
        cardBg: '#1A2B45',
        cardBorder: '#2E3C54',
        cardTitle: '#C3D4EC',
        cardValue: '#E0F2FF',
    },
}

export default createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'myCustomLightTheme',
        themes: {
            myCustomLightTheme,
            myCustomDarkTheme,
        },
        dark: {
            value: localStorage.getItem('vuetify-dark-theme') === 'true',
        },
    },
})
