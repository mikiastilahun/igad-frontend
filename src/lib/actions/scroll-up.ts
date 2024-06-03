import { onMount } from 'svelte'

type ParamsFunctionParams = {
    node: HTMLElement
    scrollY: number
    direction: 'up' | 'down'
}

type Params = {
    /** @default true */
    enabled?: boolean

    downVars: (params: ParamsFunctionParams) => { [key: `--${string}`]: string | null }
    upVars: (params: ParamsFunctionParams) => { [key: `--${string}`]: string | null }

    onScroll?: (params: ParamsFunctionParams) => void
}

export function bindCssVarToScrollDirection(node: HTMLElement, params: Params) {
    let { enabled = true, downVars, upVars, onScroll } = params

    let lastScrollY = window.scrollY
    let lastDirection: ParamsFunctionParams['direction'] = 'down'

    let ticking = false

    const handleScroll = () => {
        const _currentScrollY = window.scrollY
        const _currentDirection: ParamsFunctionParams['direction'] =
            _currentScrollY > lastScrollY ? 'down' : 'up'

        const currentParams: ParamsFunctionParams = {
            node,
            scrollY: _currentScrollY,
            direction: _currentDirection,
        }

        onScroll?.(currentParams)

        if (currentParams.direction !== lastDirection) {
            const vars =
                currentParams.direction === 'down' ? downVars(currentParams) : upVars(currentParams)
            for (const varKey in vars) {
                node.style.setProperty(varKey, vars[varKey as `--${string}`])
            }

            lastDirection = currentParams.direction
        }

        lastScrollY = currentParams.scrollY
        ticking = false
    }

    const requestTick = () => {
        if (!enabled) {
            return
        }
        if (!ticking) {
            requestAnimationFrame(handleScroll)
            ticking = true
        }
    }

    window.addEventListener('scroll', requestTick, {
        capture: true,
        passive: true,
    })

    onMount(requestTick)

    return {
        update(newParams: Params) {
            enabled = newParams.enabled ?? true

            downVars = newParams.downVars
            upVars = newParams.upVars

            onScroll = newParams.onScroll

            if (!enabled) {
                const initialParams: ParamsFunctionParams = {
                    node,
                    scrollY: 0,
                    direction: 'down',
                }
                onScroll?.(initialParams)
                const vars = downVars(initialParams)
                for (const varKey in vars) {
                    node.style.setProperty(varKey, vars[varKey as `--${string}`])
                }
                lastDirection = initialParams.direction
                lastScrollY = initialParams.scrollY
            }
        },

        destroy() {
            window.removeEventListener('scroll', requestTick, {
                capture: true,
            })
        },
    }
}
