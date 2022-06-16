<template>
  <div class="edit-table-modal">
    <custom-modal
      v-model="modal"
      wrapper-class="edit-table-modal-wrapper"
    >
      <div class="edit-cell-panel">
        <div class="cell-demo-panel">
          <div
            class="cell-box"
            :style="{
              'border-top': getBorderStyle('top'),
              'border-left': getBorderStyle('left'),
              'border-bottom': getBorderStyle('bottom'),
              'border-right': getBorderStyle('right'),
              'background-color': currentOptions.background.color
            }"
          >
            your cell
          </div>
        </div>
        <div class="edit-box">
          <div class="selector-ui">
            <div
              class="border-top-selector selector"
              :class="{ 'selected': isSelected('top') }"
              @click="selectBorder('top')"
            />
            <div
              class="border-right-selector selector"
              :class="{ 'selected': isSelected('right') }"
              @click="selectBorder('right')"
            />
            <div
              class="border-left-selector selector"
              :class="{ 'selected': isSelected('left') }"
              @click="selectBorder('left')"
            />
            <div
              class="border-bottom-selector selector"
              :class="{ 'selected': isSelected('bottom') }"
              @click="selectBorder('bottom')"
            />
            <div
              class="background-selector selector"
              :class="{ 'selected': isSelected('background') }"
              @click="selectBackground"
            />
          </div>
          <div
            v-if="selected.length && !selected.includes('background')"
            class="none-background"
          >
            <div class="type-width">
              <div
                class="cell-border-type selector-dropdown "
              >
                <div class="border-types-title">
                  border types :
                </div>
                <div
                  class="select"
                  style="width: 200px;"
                >
                  <select
                    :value="currentOptions[selected[0]].cellBorderType"
                    @input="changeAttribute($event, 'cellBorderType')"
                  >
                    <option
                      disabled
                      value=""
                    >
                      Please select a type
                    </option>
                    <option
                      value="none"
                      @click="changeAttribute({data: 'none'}, 'cellBorderType')"
                    >
                      none
                    </option>
                    <option
                      value="dotted"
                      @click="changeAttribute({data: 'dotted'}, 'cellBorderType')"
                    >
                      dotted
                    </option>
                    <option
                      value="dashed"
                      @click="changeAttribute({data: 'dashed'}, 'cellBorderType')"
                    >
                      dashed
                    </option>
                    <option
                      value="solid"
                      @click="changeAttribute({data: 'solid'}, 'cellBorderType')"
                    >
                      solid
                    </option>
                    <option
                      value="double"
                      @click="changeAttribute({data: 'double'}, 'cellBorderType')"
                    >
                      double
                    </option>
                    <option
                      value="groove"
                      @click="changeAttribute({data: 'groove'}, 'cellBorderType')"
                    >
                      groove
                    </option>
                    <option
                      value="ridge"
                      @click="changeAttribute({data: 'ridge'}, 'cellBorderType')"
                    >
                      ridge
                    </option>
                    <option
                      value="inset"
                      @click="changeAttribute({data: 'inset'}, 'cellBorderType')"
                    >
                      inset
                    </option>
                    <option
                      value="outset"
                      @click="changeAttribute({data: 'outset'}, 'cellBorderType')"
                    >
                      outset
                    </option>
                    <option
                      value="mix"
                      @click="changeAttribute({data: 'mix'}, 'cellBorderType')"
                    >
                      mix
                    </option>
                  </select>
                  <svg viewBox="0 0 24 24">
                    <!-- eslint-disable max-len -->
                    <path
                      xmlns="http://www.w3.org/2000/svg"
                      d="M10 12.458Q9.833 12.458 9.677 12.396Q9.521 12.333 9.375 12.188L5.604 8.417Q5.354 8.167 5.375 7.792Q5.396 7.417 5.625 7.188Q5.896 6.917 6.25 6.927Q6.604 6.938 6.854 7.188L10 10.354L13.167 7.188Q13.417 6.938 13.76 6.938Q14.104 6.938 14.375 7.208Q14.625 7.458 14.625 7.823Q14.625 8.188 14.375 8.438L10.625 12.188Q10.479 12.333 10.323 12.396Q10.167 12.458 10 12.458Z"
                    />
                    <!-- eslint-enable max-len -->
                  </svg>
                </div>
              </div>
              <div class="cell-border-width">
                <input
                  :value="currentOptions[selected[0]].cellBorderWidth"
                  type="number"
                  @input="changeAttribute($event, 'cellBorderWidth')"
                >
              </div>
            </div>
            <div
              class="border-color-picker"
            >
              <Sketch
                v-model="computedBackgroundColor"
              />
            </div>
          </div>

          <div
            v-else-if="selected.length && selected.includes('background')"
            class="background-color-picker-parent"
          >
            <div
              class="background-color-picker"
            >
              <Sketch
                v-model="computedBackgroundColor"
              />
            </div>
          </div>
        </div>
      </div>
      <button
        class="Update-btn"
        @click="setTableNewStyles"
      >
        Update
      </button>
    </custom-modal>
  </div>
</template>

<script>
import VueModal from '@kouts/vue-modal'
import '@kouts/vue-modal/dist/vue-modal.css'
import { Sketch } from '@ckpack/vue-color'

export default {
  name: 'EditTableModal',
  components: {
    CustomModal: VueModal,
    Sketch,
  },
  props: {
    showModal: {
      type: Boolean,
      default() {
        return false
      },
    },
  },
  emits: [
    'update:showDialog',
  ],
  data() {
    return {
      colors: '',
      currentOptions: {
        top: {
          cellBorderWidth: '2',
          cellBorderType: 'solid',
          color: 'rgba(114, 114, 114, 1)',
        },
        right: {
          cellBorderWidth: '2',
          cellBorderType: 'solid',
          color: 'rgba(114, 114, 114, 1)',
        },
        left: {
          cellBorderWidth: '2',
          cellBorderType: 'solid',
          color: 'rgba(114, 114, 114, 1)',
        },
        bottom: {
          cellBorderWidth: '2',
          cellBorderType: 'solid',
          color: 'rgba(114, 114, 114, 1)',
        },
        background: {
          color: 'rgba(255, 255, 255, 1)',
        },
      },
      selected: [],
      borderStyle: '',
      checked: false,
    }
  },
  computed: {
    modal: {
      get() {
        return this.showModal
      },
      set(value) {
        this.$emit('update:showDialog', value)
      },
    },
    getBorderStyle() {
      return (dir) => {
        if (this.currentOptions[dir].cellBorderType !== 'none') {
          const border = this.currentOptions[dir]
          return `${border.cellBorderWidth}px ${border.cellBorderType} ${border.color}`
        }
        return 'none'
      }
    },
    computedBackgroundColor: {
      get() {
        return (this.currentOptions.background.color) ? this.currentOptions.background.color : 'none'
      },
      set(value) {
        const computedVal = `rgba(${value.rgba.r}, ${value.rgba.g}, ${value.rgba.b}, ${value.rgba.a})`
        if (this.selected !== 'background') {
          this.selected.forEach((item) => {
            this.currentOptions[item].color = computedVal
          })
        } else this.currentOptions.background.color = computedVal

        // if (this.selected != 'background') {
        //   this.currentOptions[this.selected].color = computedVal
        //   return
        // }
      },
    },
    isSelected() {
      return (direction) => this.selected.includes(direction)
    },
  },
  methods: {
    changeAttribute(data, field) {
      this.selected.forEach((item) => {
        if (field === 'color') {
          this.currentOptions[item][field] = `rgba(${data.rgba.r}, ${data.rgba.b}, ${data.rgba.b}, ${data.rgba.a})`
        } else if (!data.data) {
          this.currentOptions[item][field] = data.target.value
        } else {
          this.currentOptions[item][field] = data.data
        }
      })
    },
    setTableNewStyles() {
      this.$emit('cellBordersUpdated', this.currentOptions)
    },
    selectBorder(direction) {
      this.selected = this.selected.filter((item) => item !== 'background')
      if (this.selected.includes(direction)) {
        this.selected = this.selected.filter((item) => item !== direction)
      } else {
        this.selected.push(direction)
      }
    },
    selectBackground() {
      if (this.selected.includes('background')) {
        this.selected = []
      } else {
        this.selected = ['background']
      }
    },
  },
}
</script>

<style lang="scss">
.edit-table-modal-wrapper {
  display: flex;
  align-items: center;

  .vm {
    top: auto;
    border-radius: 20px;
  }

  .vm-titlebar {
    border-bottom: none;
  }
}

</style>
<style scoped lang="scss">
.edit-box {

  .selector-ui {
    position: relative;
    height: 160px;
    width: 160px;
    display: inline-block;

    *:not(span) {
      position: absolute;
    }
  }

  .selector {
    z-index: 2;
    overflow: hidden;
    cursor: pointer;
    opacity: 0.7;

    &:hover {
      opacity: 1;
      //border-color: #85caf2;
      //cursor: pointer;
      //z-index: 1;
      //background: #85caf2;
    }
  }

  .background-selector {
    top: 31px;
    left: 31px;
    width: 98px;
    height: 98px;
    background: #96d0f2;

    &.selected {
      background: #2dadf7;
      z-index: 3;
      opacity: 1;
    }
  }

  .border-top-selector {
    top: 0;
    left: 0;
    height: 0;
    width: 100px;
    border-top: 30px solid #96d0f2;
    border-right: transparent 30px solid;
    border-left: transparent 30px solid;

    &.selected {
      border-top-color: #2dadf7;
      z-index: 3;
      opacity: 1;
    }
  }

  .border-bottom-selector {
    bottom: 0;
    left: 0;
    height: 0;
    width: 100px;
    border-bottom: 30px solid #96d0f2;
    border-right: transparent 30px solid;
    border-left: transparent 30px solid;

    &.selected {
      border-bottom-color: #2dadf7;
      z-index: 3;
      opacity: 1;
    }
  }

  .border-left-selector {
    left: 0;
    top: 0;
    height: 100px;
    width: 0;
    border-left: 30px solid #96d0f2;
    border-bottom: transparent 30px solid;
    border-top: transparent 30px solid;

    &.selected {
      border-left-color: #2dadf7;
      z-index: 3;
      opacity: 1;
    }
  }

  .border-right-selector {
    right: 0;
    top: 0;
    height: 100px;
    width: 0;
    border-right: 30px solid #96d0f2;
    border-bottom: transparent 30px solid;
    border-top: transparent 30px solid;

    &.selected {
      border-right-color: #2dadf7;
      z-index: 3;
      opacity: 1;
    }
  }
}

.edit-cell-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  .edit-box {
    width: 100%;
    padding-right: 16px;
    padding-left: 16px;
    padding-bottom: 10px;

    .background-color-picker-parent {
      display: inline-block;
      margin-left: 40px;

      .background-color-picker {
        display: inline-flex;
        justify-content: center;
      }
    }

    .none-background {
      display: inline-flex;
      justify-content: space-between;
      padding-right: 14px;
      padding-left: 14px;
      //align-items: center;
      //
    }

    .current-options {
      margin-bottom: 14px;
      display: flex;
      justify-content: center;
    }

    .cell-border-type {
      .border-types-title {
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 28px;
      }

      margin-bottom: 14px;
    }

    .cell-border-width {
      input[type="number"] {
        background-color: #f2f2f2;
        border: none;
        height: 30px;
        border-radius: 10px;
        padding-left: 12px;
        width: 100px;
      }
    }
  }

  .cell-demo-panel {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 168px;
    scroll-behavior: auto;
    overflow: scroll;
    background-color: #F4F5F6;
    margin-bottom: 14px;
    border-radius: 10px;

    .cell-box {
      width: 120px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
    }
  }
}

.Update-btn {
  border: none;
  font-size: 14px;
  color: inherit;
  background: none;
  cursor: pointer;
  padding: 25px 80px;
  display: inline-block;
  margin: 15px 30px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
  outline: none;
  position: relative;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  transition: all 0.3s;
}

.Update-btn {
  background: #3AB549;
  color: #fff;
  margin: 0;
  border-radius: 10px;
  padding: 8px 10px;
}

.Update-btn:hover {
  background: #27ae60;
}

.Update-btn:active {
  background: #27ae60;
  top: 2px;
}

.Update-btn:before {
  position: absolute;
  height: 100%;
  left: 0;
  top: 0;
  line-height: 3;
  font-size: 140%;
  width: 60px;
}

.selector-dropdown {
  .select {
    position: relative;

    select {
      -webkit-appearance: none;
      outline: 0;
      border: 0;
      display: block;
      width: 100%;
      padding: 0px 15px;
      height: 3rem;
      font-size: 1rem;
      font-weight: 400;
      background: #F2F2F2;
      border-radius: 16px;
    }

    svg {
      position: absolute;
      right: 5px;
      top: 5px;
      bottom: 0;
      margin: auto;
      height: 1.5rem;
      width: 1.5rem;
      fill: #757577;
      pointer-events: none;
    }
  }
}

@media only screen and (max-width: 520px) {
  .none-background {
    flex-direction: column;
    align-items: center;
  }
  .cell-border-width {
    margin-bottom: 14px;
  }
}
</style>
