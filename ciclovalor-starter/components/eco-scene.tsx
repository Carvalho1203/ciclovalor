export default function EcoScene() {
  return <svg className="eco-scene" viewBox="0 0 600 500" role="img" aria-labelledby="eco-title">
    <title id="eco-title">Ilustração de um ponto de reciclagem com plantas, garrafa de vidro, caixa de papelão e recipiente verde</title>
    <defs>
      <linearGradient id="bin" x1="0" x2="1"><stop stopColor="#236348"/><stop offset="1" stopColor="#164a36"/></linearGradient>
      <linearGradient id="bottle" x1="0" x2="1"><stop stopColor="#aac9a6"/><stop offset="1" stopColor="#6d9e7d"/></linearGradient>
      <linearGradient id="ground" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#dae7c8"/><stop offset="1" stopColor="#c0d7b4"/></linearGradient>
      <filter id="shadow"><feGaussianBlur stdDeviation="8"/></filter>
      <pattern id="dots" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#174c3a" opacity=".1"/></pattern>
    </defs>
    <circle cx="310" cy="246" r="207" fill="#e7edda"/>
    <circle cx="310" cy="246" r="183" fill="none" stroke="#b4c9a5" strokeDasharray="4 8"/>
    <path d="M122 178C92 264 139 366 214 389M493 316c28-80-5-176-77-217" fill="none" stroke="#62865b" strokeWidth="2"/>
    <path d="m118 179-6 19 19-4m285-95 19 1-8 16" fill="none" stroke="#62865b" strokeWidth="2" strokeLinecap="round"/>
    <ellipse cx="309" cy="426" rx="202" ry="25" fill="#1b4932" opacity=".08" filter="url(#shadow)"/>
    <path d="m109 371 224-66 183 64-218 87Z" fill="url(#ground)"/>
    <path d="m109 371 189 68 218-70v14l-218 73-189-71Z" fill="#b4cca7"/>
    <path d="m150 371 154 52 165-54-152-49Z" fill="url(#dots)"/>
    <g className="plant-left">
      <path d="M163 364c10-42 0-88-13-111" stroke="#3e684b" strokeWidth="4" fill="none"/>
      <path d="M159 315c-35 0-49-23-44-48 28-1 47 18 44 48" fill="#86a56c"/>
      <path d="M159 325c27-3 42-23 36-46-25 1-41 20-36 46" fill="#638e5b"/>
      <path d="M153 289c-25-13-29-37-15-53 23 11 30 32 15 53" fill="#547d4e"/>
      <path d="m144 346 40 12-6 34-31-9Z" fill="#d69c7d"/><path d="m144 346 20-6 40 12-20 6Z" fill="#e9b69a"/><path d="m184 358 20-6-9 34-17 6Z" fill="#bc8065"/>
    </g>
    <g>
      <path d="m225 220 133-37 81 29-137 42Z" fill="#51875d"/>
      <path d="m225 220 77 28v149l-67-24Z" fill="#35724e"/>
      <path d="m302 248 137-36-9 149-128 36Z" fill="url(#bin)"/>
      <path d="m219 210 143-40 85 30-144 43Z" fill="#5b8a62"/>
      <path d="m219 210 84 29v14l-84-30Z" fill="#2e6041"/>
      <path d="m303 239 144-39v13l-144 40Z" fill="#1d5036"/>
      <path d="m254 207 103-29 46 16-103 29Z" fill="#193f2d"/>
      <path d="m263 208 95-27 34 12-94 28Z" fill="#102e21"/>
      <path d="m319 270 98-28-2 8-97 28Z" fill="#46805a"/>
      <path d="m249 252 24 9v11l-24-9Z" fill="#235b3e"/>
      <g transform="translate(326 286) skewY(-15) scale(.78)">
        <path d="m31 1 11 19H33l-9-13c-2-3-6-3-8 1L6 24l-13-8L5-4C12-14 24-12 31 1Z" fill="#d4e8a9"/>
        <path d="m42 20-21 2 12-20Z" fill="#d4e8a9"/>
        <path d="m51 26 11 20c6 11-1 21-13 21H28V52h20c4 0 5-3 3-6l-12-19Z" fill="#d4e8a9"/>
        <path d="m28 52 1 23-18-12Z" fill="#d4e8a9"/>
        <path d="m7 51-21-1c-12-1-17-12-11-22l10-17 13 8-10 17c-2 3 0 6 4 6H9Z" fill="#d4e8a9"/>
        <path d="m-15 11-19 13 23 4Z" fill="#d4e8a9"/>
      </g>
      <ellipse cx="250" cy="379" rx="8" ry="11" fill="#183c2c"/><ellipse cx="407" cy="371" rx="9" ry="12" fill="#103a2a"/>
    </g>
    <g>
      <path d="m385 161 15-5 13 5v28c0 10 21 16 22 31l1 72c0 13-39 25-46 10l-2-74c0-14 12-26 9-33l-12-10Z" fill="url(#bottle)"/>
      <path d="m385 161 14-4 13 4-14 5Z" fill="#bfd4b6"/>
      <path d="m386 152 13-4 14 5v11l-15 4-12-5Z" fill="#25563c"/>
      <path d="m398 218 26-8 2 54-27 9Z" fill="#f0e7cc" opacity=".9"/>
      <path d="m405 237 10-3m-9 10 10-3m-11 10 12-4" stroke="#6f9975" strokeWidth="2"/>
      <path d="m394 213 2 73" stroke="#d6e7c7" strokeWidth="3" opacity=".6"/>
    </g>
    <g>
      <path d="m204 303 58-17 55 20-61 19Z" fill="#d4ae6e"/>
      <path d="m204 303 52 22v83l-51-22Z" fill="#bc955f"/>
      <path d="m256 325 61-19-2 83-59 19Z" fill="#d7b27a"/>
      <path d="m227 296 53 22 13-4-55-21Z" fill="#ecd3a3"/>
      <path d="m280 318 13-4-2 35-12 4Z" fill="#ead1a2"/>
      <path d="m216 339 25 10m-25-2 17 7" stroke="#936f45" strokeWidth="2"/>
      <path d="m276 373 17-5m-17 11 22-6" stroke="#a37d4c" strokeWidth="2"/>
    </g>
    <g>
      <path d="m326 369 29-15 37 13 9 47-41 15-37-17Z" fill="#c97d67"/>
      <path d="m355 354 6 75 40-15-9-47Z" fill="#de9981"/>
      <path d="M340 371v-19c0-18 25-18 25 0v12" fill="none" stroke="#b3735c" strokeWidth="5"/>
      <path d="m370 369 1 41" stroke="#edb298" strokeWidth="3"/>
      <path d="M344 392c6-13 18-14 23-9-2 14-11 19-23 9Z" fill="#efd8b7"/>
    </g>
    <g transform="translate(452 326)">
      <path d="M0 48c4-22 4-39-3-64" stroke="#56774e" strokeWidth="3" fill="none"/>
      <path d="M-1 13c-21-2-29-17-25-33 19 0 29 13 25 33" fill="#769863"/>
      <path d="M1 32c20-6 29-20 21-35C4 1-3 15 1 32" fill="#91ae7d"/>
      <path d="M-3-7c15-11 19-25 10-36C-7-34-12-19-3-7" fill="#547d4e"/>
    </g>
    <path d="m188 139 5-11 5 11 11 5-11 5-5 11-5-11-11-5Z" fill="#b5ca85"/>
    <path d="m459 124 3-7 3 7 7 3-7 3-3 7-3-7-7-3Z" fill="#dba890"/>
    <circle cx="142" cy="223" r="4" fill="#d5af7d"/><circle cx="476" cy="276" r="4" fill="#88a474"/>
  </svg>;
}
