<template>
  <div>
    <h1>test</h1>

    <div ref="pixi" class="pixi-container"></div>

    <div ref="svg" class="svg-demo"></div>
  </div>
</template>

<script>
import gsap from 'gsap';
import { PixiPlugin } from 'gsap/PixiPlugin.js';

let PIXI;

export default {
  data() {
    return {
      svg: null
    };
  },
  async mounted() {
    gsap.registerPlugin(PixiPlugin);

    await this.$nextTick();
    await this.loadSVG();
    this.load();
  },
  methods: {
    async loadSVG() {
      const stringContainingXMLSource = await fetch(
        require('@/assets/city-01.svg')
      ).then(r => r.text());
      this.$refs.svg.innerHTML = stringContainingXMLSource;

      const parser = new DOMParser();
      this.svg = parser.parseFromString(
        stringContainingXMLSource,
        'image/svg+xml'
      );

      console.log(this.svg.querySelectorAll('rect, path, line'));
    },

    load() {
      if (process.client) {
        PIXI = require('pixi.js');

        const app = new PIXI.Application({ width: 1592, height: 576 });

        this.$refs.pixi.appendChild(app.view);

        for (let index = 0; index < 3000; index++) {
          const graphics = new PIXI.Graphics();
          app.stage.addChild(graphics);
          const path = { offset: 0 };

          gsap.to(path, 2, {
            offset: 1000,
            onUpdate: () => {
              graphics.clear();
              graphics.lineStyle(1, 0xffffff, 1);
              graphics.moveTo(0, index);
              graphics.lineTo(path.offset, index);
            }
          });
        }

        // const path = this.svg.querySelector('#Rectangle_3031_1_');
        // console.log(path);
      }
    }

    // drawRect(rect, x, y, width, height) {
    //   line.moveTo(90.58, 515.02);
    //   line.lineTo(90.58 + 90.68, 515.02);
    //   line.lineTo(90.58 + 90.68, 515.02 + 20.13);
    //   line.lineTo(90.58, 515.02 + 20.13);
    //   line.closePath();
    // }
  }
};
</script>
