import { createSystem, defaultConfig } from "@chakra-ui/react"

export const theme = createSystem(defaultConfig, {
    theme: {
        tokens: {
            fonts: {
                heading: { value: `'Figtree', sans-serif` },
                body: { value: `'Figtree', sans-serif` },
            },
            colors: {
                brand: {
                    100: { value: '#f7c6c7' },
                    900: { value: '#c2185b' },
                },
            }
        },
    },
})
