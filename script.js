class PlotStage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.plots = 10;
    this.increase = (Math.PI * 2) / this.plots;
    this.angle = 0;
    this.plotCache = [];
    this.plotRadio = 10;
  }

  connectedCallback() {
    this.render();
    this.createPlots();
    this.startRotation();
  }

  render() {
    this.shadowRoot.innerHTML = `
          <style>
            :host {
              width: 400px;
              height: 400px;
              position: relative;
              display: block;
              background: #0000;
              overflow: hidden;
              font-weight: bold;
              text-align: center;
              border-radius: 50%;
            }

            .stage:hover {
              .plot {
                background: linear-gradient(to right, #e81cff, #fff95b);
              }
            }

            .plot {
              position: absolute;
              width: 40px;
              height: 40px;
              transition: background .4s linear;
              background: linear-gradient(to right, springgreen, skyblue);
            }
          </style>
          <div class="stage"></div>
        `;
    this.stage = this.shadowRoot.querySelector('.stage');
  }

  createPlots() {
    for (let i = 0; i < this.plots; i++) {
      const plot = document.createElement('div');
      plot.classList.add('plot');
      this.stage.appendChild(plot);
      this.plotCache.push(plot);
    }
  }

  startRotation() {
    setInterval(() => this.rotatePlots(), 33);
  }

  rotatePlots() {
    for (let i = 0; i < this.plots; i++) {
      const x = this.plotRadio * Math.cos(this.angle) + 170;
      const y = this.plotRadio * Math.sin(this.angle) + 170;
      const rotatePlot = Math.atan2(y - 170, x - 170);
      this.plotCache[
        i
      ].style.transform = `translate(${x}px,${y}px) rotate(${rotatePlot}rad)`;
      this.angle += this.increase;
    }
    this.angle += 0.06;
    this.plotRadio += 0.5;
  }
}

customElements.define('plot-stage', PlotStage);
