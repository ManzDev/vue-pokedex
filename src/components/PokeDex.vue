<template>
  <div class="pokedex">
    <div class="top">
      <div class="button blue big"></div>
      <div class="button red small"></div>
      <div class="button yellow small"></div>
      <div class="button green small"></div>
    </div>
    <div class="topright"></div>
    <div class="frame">
      <div class="horizontal center">
        <div class="button red small"></div>
        <div class="button red small"></div>
      </div>
      <div class="screen">
        <img :src="getImage()" :alt="getName()">
      </div>
      <div>
        <div class="button red medium"></div>
        <div class="speaker"></div>
      </div>
  </div>
  <div class="controls">
    <div class="button black large"></div>
    <div class="vertical">
      <div class="horizontal">
        <div class="button red flat"></div>
        <div class="button blue flat"></div>
      </div>
      <div class="lcd">{{ getName(id) }}</div>
    </div>
    <div class="d-pad">
      <div class="up"></div>
      <div class="left" @click="goBack()"></div>
      <div class="center"></div>
      <div class="right" @click="goNext()"></div>
      <div class="down"></div>
    </div>
  </div>
</template>

<script>
import { Howl } from 'howler';
import images from '../../assets/images/*.png';
import cries from '../../assets/sounds/*.mp3';
import json from '../../assets/pokemon.json';

Number.prototype.toLongId = function() {
  return this.toString().padStart(3, 0);
};

export default {
  name: 'Pokedex',
  props: {
    id: {
      type: Number,
      required: false,
      default: 1,
      validator: v => (v > 0) && (v < 151)
    }
  },
  data() {
    return {
      pokemonId: this.id,        // 1, 2, 3...
      crySound: null
    }
  },
  computed: {
    max: () => 150,
    min: () => 1,
  },
  methods: {
    getImage() {
      return images[this.pokemonId.toLongId()];
    },
    getName() {
      const name = json[this.pokemonId - 1].name;
      return `${this.pokemonId}. ${name[0].toUpperCase() + name.slice(1)}`;
    },
    playCry() {
      this.crySound.play();
    },
    goNext() {
      //location.href = `/id/${this.id + 1}`;
      this.pokemonId = (this.pokemonId < this.max) ? this.pokemonId + 1 : this.pokemonId;
    },
    goBack() {
      //location.href = `/id/${this.id - 1}`;
      this.pokemonId = (this.pokemonId > this.min) ? this.pokemonId - 1 : this.pokemonId;
    }
  },
  created() {
    document.title = 'Vue PokeDex';
  },
  updated() {
    this.crySound = new Howl({
      src: [ cries[this.pokemonId.toLongId()] ],
      volume: 0.25
    });
    this.playCry();
    this.$router.replace('/id/' + this.pokemonId);
  }
}
</script>

<style lang="postcss">
  .pokedex {
    width: 500px;
    margin: 3em auto;
    height: 725px;
    background: red;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    position: relative;

    & .top {
      width: 250px;
      height: 100px;
      border-bottom: 3px solid darkred;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-left: 40px;
    }

    & .topright {
      position: absolute;
      top: 0;
      right: 0;
      width: 150px;
      height: 50px;
      border-bottom: 3px solid darkred;

      &::before {
        position: relative;
        top: 24px;
        left: -85px;
        display: block;
        content: "";
        width: 70px;
        height: 60px;
        border-bottom: 3px solid darkred;
        transform: rotate(-42deg);
      }
    }
  }

  .button {
    --size-blur: 5px;
    border-radius: 50%;
    margin: 0 10px;
    background: radial-gradient(closest-side, #fff 1px, transparent 5px), var(--light-color);
    box-shadow: 0 0 var(--size-blur) var(--dark-color) inset;

    &.big {
      --size-blur: 40px;
      width: 50px;
      height: 50px;
      border: 5px solid #eee;
    }

    &.small {
      width: 20px;
      height: 20px;
      border: 1px solid #333;
    }

    &.large {
      width: 35px;
      height: 35px;
      border: 1px solid #111;
    }

    &.flat {
      width: 40px;
      height: 10px;
      border-radius: 2px;
    }

    &.blue {
      --light-color: cyan;
      --dark-color: blue;
    }

    &.black {
      --light-color: #333;
      --dark-color: black;
      background: black;
    }

    &.red {
      --light-color: #db1010;
      --dark-color: #4e0606;
    }

    &.yellow {
      --light-color: #c5b41a;
      --dark-color: #948714;
    }

    &.green {
      --light-color: #15bb2b;
      --dark-color: #076207;
    }
  }

  .controls {
    display: flex;
    justify-content: space-between;
    padding: 20px;
  }

  .frame {
    background: #999;
    margin: 30px;
    padding: 45px;
    padding-top: 15px;
    border-radius: 5px 5px 5px 55px;

    & .screen {
      background: #111;
      text-align: center;
      border-radius: 5px;
      width: 350px;
      height: 304px;

      & img {
        max-width: 350px;
        max-height: 300px;
        margin: auto;
      }
    }

    & .horizontal {
      padding: 15px 0;
    }
  }

  .vertical {
    display: flex;
    flex-direction: column;
  }

  .horizontal {
    display: flex;
    justify-content: center;
  }

  .center {
    justify-content: center;
  }

  .lcd {
    font-family: 'Orbitron', sans-serif;
    font-weight: bold;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 50px;
    margin: 10px;
    background: #4b8f4b;
    border: 1px solid #333;
    border-radius: 3px;
  }

  .d-pad {
    --round-pad: 4px;
    display: grid;
    grid-template-columns: repeat(3, 30px);
    grid-template-rows: repeat(3, 30px);
    filter: drop-shadow(0 0 3px rgba(0, 0, 0, 0.5));

    & .up {
      grid-column: 2;
      border-radius: var(--round-pad) var(--round-pad) 0 0;
    }

    & .left {
      grid-row: 2;
      grid-column: 1;
      border-radius: var(--round-pad) 0 0 var(--round-pad);
    }

    & .center {
      grid-row: 2;
      grid-column: 2;
    }

    & .right {
      grid-row: 2;
      grid-column: 3;
      border-radius: 0 var(--round-pad) var(--round-pad) 0;
    }

    & .down {
      grid-row: 3;
      grid-column: 2;
      border-radius: 0 0 var(--round-pad) var(--round-pad);
    }

    & > div {
      background: black;
    }
  }
</style>
