import lng from '@lightningjs/core';

export default class Tile extends lng.Component {
  static _template() {
    return {
      Item: {
        Image: {},
        Title: {
          alpha: 0,
          x: 0,
          y: 318,
          zIndex: 10,
          mountY: 0.5,
          text: { text: '' },
        },
      },
      FocusRing: {
        alpha: 0,
      },
    };
  }

  _construct() {
    super._construct();
    this.spacing = 20;
    this.radius = 4;
  }

  set src(val) {
    this._src = val;
  }

  get src() {
    return this._src;
  }

  get _Image() {
    return this.tag('Item.Image');
  }

  get _FocusRing() {
    return this.tag('FocusRing');
  }

  get _Title() {
    return this.tag('Item.Title');
  }

  _focus() {
    this._FocusRing.smooth = { alpha: 1 };
    this._Title.smooth = { alpha: 1 };
  }

  _unfocus() {
    this._FocusRing.smooth = { alpha: 0 };
    this._Title.smooth = { alpha: 0 };
  }

  _firstEnable() {
    this._FocusRing.patch({
      w: this.w + this.spacing,
      h: this.h + this.spacing,
      mount: 0.5,
      x: this.w / 2,
      y: this.h / 2,
      zIndex: 2,

      texture: lng.Tools.getRoundRect(
        this.w + this.spacing,
        this.h + this.spacing,
        4,
        4,
        false,
        false
      ),
    });

    this._Image.patch({
      rtt: true,
      zIndex: 2,
      w: this.w,
      h: this.h,
      texture: {
        type: lng.textures.ImageTexture,
        src: this._src,
        resizeMode: { type: 'cover', w: this.w, h: this.h },
      },
    });

    this._Title.patch({
      text: {
        text: this.title,
        fontSize: 20,
      },
    });
  }
}
