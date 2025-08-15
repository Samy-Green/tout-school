import { menuConfig } from '#config/menu'
import renderConfig from '#config/render'
import { canAccessMenu } from '#utilities/menu'
import { defineConfig } from '@adonisjs/inertia'
import type { InferSharedProps } from '@adonisjs/inertia/types'

const inertiaConfig = defineConfig({
  /**
   * Path to the Edge view that will be used as the root view for Inertia responses
   */
  rootView: 'inertia_layout',

  /**
   * Data that should be shared with all rendered pages
   */
  sharedData: {
    // user: (ctx) => ctx.inertia.always(() => ctx.auth.user),
    me: (ctx) => ctx.inertia.always(() => ctx.auth.user),
    flash: (ctx) => ctx.inertia.always(() => ctx.session.flashMessages),
    configData: (ctx) => ctx.inertia.always(() => renderConfig),
    menu: async (ctx) => {
      const user = ctx.auth.user

      const filteredMenu = menuConfig.menu.filter((item) => canAccessMenu(user, item))

      return filteredMenu
    },
  },

  /**
   * Options for the server-side rendering
   */
  ssr: {
    enabled: false,
    entrypoint: 'inertia/app/ssr.tsx',
  },
})

export default inertiaConfig

declare module '@adonisjs/inertia/types' {
  export interface SharedProps extends InferSharedProps<typeof inertiaConfig> {}
}
