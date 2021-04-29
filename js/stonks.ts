interface Stonk {
	name: string
	datapoints: [ number, number ][]
	colour: string
	logo: HTMLImageElement
}

const createImg = (src: string) => {
	const img = new Image()
	img.src = src
	return img
}

class StonkAnim {
	canvas: HTMLCanvasElement
	ctx: CanvasRenderingContext2D
	stonks: Stonk[]
	finishedStonks: boolean[]
	time: number
	startTime: number

	started = false

	finished() {
		let finished = true

		for (const stonkFinished of this.finishedStonks) {
			if (!stonkFinished) {
				finished = false
				break
			}
		}

		return finished
	}

	static lineWidth = 7
	static logoSize = 30
	static logoTabRadius = 25
	static logoTabOpacity = '77'
	static duration = 3000
	static horizontalPadding = 50
	static verticalPadding = 0
	static alternateDelay = 300

	constructor(stonks: Stonk[]) {
		this.canvas = document.querySelector<HTMLCanvasElement>('canvas#stonks')
		this.ctx = this.canvas.getContext('2d')
		this.stonks = stonks
		this.finishedStonks = Array(this.stonks.length).fill(false)

		addEventListener('resize', () => this.resize())
		this.resize()
	}

	resize() {
		const size = Math.min(innerWidth, innerHeight)
		this.canvas.width = size
		this.canvas.height = size
		if (this.started) this.draw()
	}

	translate(x: number, y: number): [ number, number ] {
		const width = this.canvas.width - StonkAnim.horizontalPadding * 2
		const height = this.canvas.height - StonkAnim.verticalPadding * 2

		return [
			x * width + StonkAnim.horizontalPadding,
			(1 - y) * height + StonkAnim.verticalPadding
		]
	}

	drawStonkStart(stonk: Stonk) {
		const x = stonk.datapoints[0][0]
		const y = stonk.datapoints[0][1]

		this.ctx.beginPath()
		this.ctx.moveTo(...this.translate(x, y))
	}

	drawStonkPoint(stonk: Stonk, index: number) {
		const x = stonk.datapoints[index][0]
		const y = stonk.datapoints[index][1]

		this.ctx.lineTo(...this.translate(x, y))
	}

	drawStonkEnd(stonk: Stonk, index: number, time: number) {
		const prevX = stonk.datapoints[index - 1][0]
		const prevY = stonk.datapoints[index - 1][1]
		const nextX = stonk.datapoints[index][0]
		const nextY = stonk.datapoints[index][1]

		const slope = (nextY - prevY) / (nextX - prevX)

		const x = time
		const y = prevY + (time - prevX) * slope

		this.ctx.lineTo(...this.translate(x, y))

		this.ctx.strokeStyle = stonk.colour
		this.ctx.lineWidth = StonkAnim.lineWidth
		this.ctx.stroke()

		const tr = this.translate(x, y)
		const xLogo = tr[0]
		const yLogo = tr[1]

		this.ctx.beginPath()
		this.ctx.fillStyle = stonk.colour + StonkAnim.logoTabOpacity
		this.ctx.arc(xLogo, yLogo, StonkAnim.logoTabRadius, 0, 2 * Math.PI)
		this.ctx.fill()

		this.ctx.drawImage(stonk.logo, xLogo - StonkAnim.logoSize / 2,
			yLogo - StonkAnim.logoSize / 2, StonkAnim.logoSize, StonkAnim.logoSize)

		this.ctx.font = '24px Titillium Web'
		this.ctx.fillStyle = stonk.colour
		this.ctx.fillText(`${ (y * 100).toFixed(1) }%`, xLogo - 20, yLogo - 30)
	}

	draw() {
		for (let i = 0; i < this.stonks.length; i++) {
			const time = Math.min(1, Math.max(0,
				this.easingFunction(this.time - StonkAnim.alternateDelay * i)))

			const stonk = this.stonks[i]

			if (1 - time < 0.0001) {
				this.finishedStonks[i] = true
			}

			this.drawStonkStart(stonk)

			for (let i = 0; i < stonk.datapoints.length; i++) {

				if (stonk.datapoints[i][0] < time
					|| stonk.datapoints[i][0] == 0 && time == 0)
				{
					this.drawStonkPoint(stonk, i)
				} else {
					this.drawStonkEnd(stonk, i, time)
					break
				}
			}
		}
	}

	animate() {
		this.time = 0
		this.startTime = Date.now()
		this.started = true
		this.render()
	}

	easingFunction (time: number) {
		if (time < StonkAnim.duration / 2) {
			const x = time / StonkAnim.duration
			return 4 * x * x * x
		} else {
			const x = -2 * time / StonkAnim.duration + 2
			return 1 - (x * x * x) / 2
		}
	}

	updateTime() {
		const now = Date.now()
		this.time = now - this.startTime
	}

	render() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
		this.draw()
		this.updateTime()

		if (!this.finished()) {
			requestAnimationFrame(() => this.render())
		}
	}
}
