<template>
  <dialog class="window" ref="dialog">
    <slot name="header">
      <div class="window-caption">
        <span class="window-caption-title">
            <slot name="title">{{ title || 'WINDOW' }}</slot>
          </span>
        <slot name="actions">
          <!--<span class="btn-min"></span>-->
          <!--<span class="btn-max"></span>-->
          <span class="btn-close" @click="close()"></span>
        </slot>
      </div>
    </slot>
    <div class="window-content">
      <slot></slot>
    </div>
  </dialog>
</template>

<script type="application/ecmascript">
  export default {
    name: 'ui-window',
    props: {
      title: {
        type: String,
        required: false
      },
//      actions: {
//        type: Array,
//        required: false
//      },
      modal: {
        type: Boolean,
        required: false
      },
      open: {
        type: Boolean,
        required: false
      }
    },
    watch: {
      open () {
        if (this.open) {
          this.show()
        } else {
          this.close()
        }
      }
    },
    methods: {
      show () {
        if (this.modal) {
          this.$refs.dialog.showModal()
        } else {
          this.$refs.dialog.show()
        }
        this.$emit('show')
      },
      close () {
        if (this.$refs.dialog.open) {
          this.$refs.dialog.close()
          this.$emit('close')
        }
      }
    }
  }
</script>

<style scoped>
  .window {
    position: absolute;
    z-index: 22;
    width: 100%;
    height: auto;
    padding: 0;
    background-color: #ffffff;
    border: none;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.3);
    overflow: hidden;
  }

  .window-caption {
    position: relative;
    background-color: #ffffff;
    padding: 18px;
    border-bottom: 1px #e9e9e9 solid;
    border-top: 0;
    cursor: default;
  }

  .window-caption .window-caption-title {
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
  }

  .window-caption .btn-close,
  .window-caption .btn-min,
  .window-caption .btn-max {
    position: absolute;
    height: 25px;
    width: 25px;
    min-height: 25px;
    text-align: center;
    vertical-align: middle;
    font-size: 16px;
    font-weight: normal;
    z-index: 3;
    outline: none;
    cursor: pointer;
    display: block;
    background-color: #ffffff;
    color: #777777;
    top: 14px;
    right: 14px;
  }

  .window-caption .btn-close:hover,
  .window-caption .btn-min:hover,
  .window-caption .btn-max:hover {
    background-color: #cde6f7;
    color: #2a8dd4;
  }

  .window-caption .btn-close:hover:after,
  .window-caption .btn-min:hover:after,
  .window-caption .btn-max:hover:after {
    border-color: #2a8dd4;
  }

  .window-caption .btn-close:active,
  .window-caption .btn-min:active,
  .window-caption .btn-max:active {
    background-color: #92c0e0;
    color: #ffffff;
  }

  .window-caption .btn-close:after,
  .window-caption .btn-min:after,
  .window-caption .btn-max:after {
    border-color: #777777;
    content: '\D7';
    position: absolute;
    left: 50%;
    top: -2px;
    margin-left: -0.25em;
  }

  .window-caption .btn-min:after,
  .window-caption .btn-max:after {
    display: block;
    position: absolute;
    width: 10px;
    height: 10px;
    border: 0 #000 solid;
    border-bottom-width: 2px;
    content: ' ';
    bottom: 6px;
    left: 50%;
    margin-left: -6px;
    top: auto;
  }

  .window-caption .btn-max:after {
    height: 6px;
    border: 1px #000 solid;
    border-top-width: 2px;
  }

  .window-caption .btn-max {
    right: 37px;
  }

  .window-caption .btn-min {
    right: 63px;
  }

  .window-caption .btn-close:after {
    margin-top: 3px;
    margin-left: -5px;
  }

  .window-content {
    position: relative;
    width: 100%;
    height: 100%;
    display: block;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: auto;
  }
</style>
