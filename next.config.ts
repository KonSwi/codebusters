import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.unshift({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      resourceQuery: { not: [/url/] },
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgo: true,
            svgoConfig: {
              plugins: [
                { name: 'removeViewBox', active: false },
                {
                  name: 'preset-default',
                  params: { overrides: { removeHiddenElems: false } },
                },
              ],
            },
            titleProp: true,
            ref: true,
          },
        },
      ],
    })
    config.module.rules.unshift({
      test: /\.svg$/i,
      type: 'asset/resource',
      resourceQuery: /url/,
    })

    return config
  },
}

export default withNextIntl(nextConfig)
