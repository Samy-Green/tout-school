// resources/js/Layouts/BlankLayout.tsx
import { Head } from '@inertiajs/react'
import React from 'react'

interface Props {
  title?: string
  children: React.ReactNode
}

export default function BlankLayout({ title, children }: Props) {
  return (
    <html lang="fr">
      <head>
        <Head title={title || 'Mon Application'} />

        {/* Meta tags */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Description de mon application" />

        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />

        {/* Styles globaux */}
        <link rel="stylesheet" href="/css/app.css" />

        {/* Scripts globaux si besoin */}
        {/* <script src="/js/global.js" defer></script> */}
      </head>
      <body>{children}</body>
    </html>
  )
}
