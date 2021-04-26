const stonks: Stonk[] = [
	{
		name: 'Bitcoin',
		datapoints: [
			[ 0.0, 0.50 ],
			[ 0.1, 0.52 ],
			[ 0.2, 0.57 ],
			[ 0.4, 0.49 ],
			[ 0.5, 0.55 ],
			[ 0.6, 0.62 ],
			[ 0.8, 0.61 ],
			[ 0.9, 0.64 ],
			[ 1.0, 0.69 ]
		],
		colour: '#f2a900',
		logo: createImg('img/bitcoin.svg')
	},
	{
		name: 'Ethereum',
		datapoints: [
			[ 0.0, 0.23 ],
			[ 0.2, 0.26 ],
			[ 0.3, 0.28 ],
			[ 0.4, 0.33 ],
			[ 0.5, 0.31 ],
			[ 0.6, 0.38 ],
			[ 0.7, 0.37 ],
			[ 0.8, 0.41 ],
			[ 1.0, 0.53 ]
		],
		colour: '#3c3c3d',
		logo: createImg('img/ethereum.svg')
	},
	{
		name: 'Ripple',
		datapoints: [
			[ 0.0, 0.32 ],
			[ 0.1, 0.25 ],
			[ 0.2, 0.22 ],
			[ 0.4, 0.24 ],
			[ 0.5, 0.29 ],
			[ 0.7, 0.34 ],
			[ 0.8, 0.35 ],
			[ 1.0, 0.39 ]
		],
		colour: '#006097',
		logo: createImg('img/ripple.svg')
	},
	{
		name: 'Neo',
		datapoints: [
			[ 0.0, 0.09 ],
			[ 0.1, 0.14 ],
			[ 0.2, 0.19 ],
			[ 0.3, 0.25 ],
			[ 0.4, 0.14 ],
			[ 0.6, 0.21 ],
			[ 0.7, 0.23 ],
			[ 0.9, 0.28 ],
			[ 1.0, 0.26 ]
		],
		colour: '#00e599',
		logo: createImg('img/neo.svg')
	}
]

const stonkAnim = new StonkAnim(stonks)
stonkAnim.animate()