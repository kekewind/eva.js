import { IDEProp } from '../decorators/ide';
import Component from './Component';

/**
 * Two dimensional vector
 */
interface Vector2 {
  x: number;
  y: number;
}

/**
 * Two dimensional size
 */
interface Size2 {
  width: number;
  height: number;
}

/**
 * Radiation transformation martix
 *
 * {@link https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-function/matrix() }
 */
export interface TransformMatrix {
  a: number;
  b: number;
  c: number;
  d: number;
  tx: number;
  ty: number;
  array?: number[];
}

/**
 * Transform propterty
 */
export interface TransformParams {
  position?: Vector2;
  size?: Size2;
  origin?: Vector2;
  anchor?: Vector2;
  scale?: Vector2;
  rotation?: number;
}

/** Basic component for gameObject, See {@link TransformParams}  */
class Transform extends Component {
  /**
   * component's name
   * @readonly
   */
  static componentName: string = 'Transform';
  readonly name: string = 'Transform';
  private _parent: Transform = null;

  /** Whether this transform in a scene object */
  inScene: boolean = false;

  /** World coordinate system transformation matrix */
  worldTransform: TransformMatrix;

  /** Child transform components */
  children: Transform[] = [];

  /**
   * Init component
   * @param params - Transform init data
   */
  init(params: TransformParams = {}) {
    const props = ['position', 'size', 'origin', 'anchor', 'scale', 'skew'];
    for (const key of props) {
      Object.assign(this[key], params[key]);
    }
    this.rotation = params.rotation || this.rotation;
  }

  @IDEProp position: Vector2 = { x: 0, y: 0 };
  @IDEProp size: Size2 = { width: 0, height: 0 };
  @IDEProp origin: Vector2 = { x: 0, y: 0 };
  @IDEProp anchor: Vector2 = { x: 0, y: 0 };
  @IDEProp scale: Vector2 = { x: 1, y: 1 };
  @IDEProp skew: Vector2 = { x: 0, y: 0 };
  @IDEProp rotation: number = 0;

  set parent(val: Transform) {
    if (val) {
      val.addChild(this);
    } else if (this.parent) {
      this.parent.removeChild(this);
    }
  }

  /**
   * Get parent of this component
   */
  get parent(): Transform {
    return this._parent;
  }

  /**
   * Add Child Transform
   * @remarks
   * If `child` is already a child of this component, `child` will removed to the last of children list
   * If `child` is already a child of other component, `child` will removed from its parent first
   * @param child - child gameObject's transform component
   */
  addChild(child: Transform) {
    if (child.parent === this) {
      const index = this.children.findIndex(item => item === child);
      this.children.splice(index, 1);
    } else if (child.parent) {
      child.parent.removeChild(child);
    }
    child._parent = this;
    this.children.push(child);
  }

  /**
   * Remove child transform
   * @param child - child gameObject's transform component
   */
  removeChild(child: Transform) {
    const index = this.children.findIndex(item => item === child);
    if (index > -1) {
      this.children.splice(index, 1);
      child._parent = null;
    }
  }

  /** Clear all child transform */
  clearChildren() {
    this.children.length = 0;
  }
}

export default Transform;
