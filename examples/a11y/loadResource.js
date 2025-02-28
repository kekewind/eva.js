const loadText = game => {
  const text = new GameObject('text', {
    position: {
      x: 0,
      y: 0,
    },
    origin: {
      x: 0,
      y: 0,
    },
    anchor: {
      x: 0,
      y: 0,
    },
  });
  text.addComponent(
    new Text({
      text: '欢迎试用EVA互动游戏开发体系！',
      style: {
        fontFamily: 'Arial',
        fontSize: 36,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: ['#b35d9e', '#84c35f', '#ebe44f'], // gradient
        fillGradientType: 1,
        fillGradientStops: [0.1, 0.4],
        stroke: '#4a1850',
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 1000,
        breakWords: true,
      },
    }),
  );
  setTimeout(() => {
    game.scene.addChild(text);
  }, 1000);
  setTimeout(() => {
    text.addComponent(new A11y({hint: 'aaaa'}));
  }, 2000);
  // setTimeout(() => {
  //   text.addComponent(new A11y({ hint: 'aaaa' }))
  // }, 3000);
  setTimeout(() => {
    game.scene.removeChild(text);
  }, 4000);

  // text.removeComponent('A11y')
};
const loadImage = game => {
  const image = new GameObject('image', {
    size: {width: 600, height: 400},
    origin: {x: 0.5, y: 0.5},
    scale: {x: 0.8, y: 0.8},
    anchor: {
      x: 0.5,
      y: 0.5,
    },
    position: {
      x: 0,
      y: 0,
    },
  });

  image.addComponent(
    new Img({
      resource: 'image',
    }),
  );
  image.addComponent(
    new A11y({hint: '这是一张图片', 'aria-aaa': '123', delay: 100}),
  );
  // @ts-ignore
  window.image = image;
  game.scene.addChild(image);
  setTimeout(() => {
    // game.scene.removeChild(image);
  }, 2000);
};
const loadSprite = game => {
  const gameObj1 = new GameObject('symbol_1', {
    size: {width: 20, height: 20},
    position: {
      x: 120,
      y: 500,
    },
  });

  const spriteCom1 = new Sprite({
    resource: 'spriteName',
    spriteName: 'symbol_1',
  });

  gameObj1.addComponent(spriteCom1);

  const gameObj2 = new GameObject('symbol_2', {
    size: {width: 20, height: 20},
    position: {
      x: 0,
      y: 500,
    },
  });

  const spriteCom2 = new Sprite({
    resource: 'spriteName',
    spriteName: 'symbol_2',
  });

  gameObj2.addComponent(spriteCom2);

  const gameObj3 = new GameObject('symbol_3', {
    size: {width: 20, height: 20},
    position: {
      x: 30,
      y: 500,
    },
  });

  const spriteCom3 = new Sprite({
    resource: 'spriteName',
    spriteName: 'symbol_3',
  });

  gameObj3.addComponent(spriteCom3);

  const gameObj4 = new GameObject('symbol_4', {
    size: {width: 20, height: 20},
    position: {
      x: 60,
      y: 500,
    },
  });

  const spriteCom4 = new Sprite({
    resource: 'spriteName',
    spriteName: 'symbol_4',
  });

  gameObj4.addComponent(spriteCom4);

  const gameObj5 = new GameObject('symbol_5', {
    size: {width: 20, height: 20},
    position: {
      x: 90,
      y: 500,
    },
  });

  const spriteCom5 = new Sprite({
    resource: 'spriteName',
    spriteName: 'symbol_5',
  });

  gameObj5.addComponent(spriteCom5);
  gameObj1.addComponent(
    new A11y({
      hint: 'sprite 1',
      attr: {
        'tab-index': '0',
      },
    }),
  );
  gameObj2.addComponent(
    new A11y({
      hint: 'sprite 2',
    }),
  );
  gameObj3.addComponent(
    new A11y({
      hint: 'sprite 3',
    }),
  );
  gameObj4.addComponent(
    new A11y({
      hint: 'sprite 4',
    }),
  );
  gameObj5.addComponent(
    new A11y({
      hint: 'sprite 5',
    }),
  );

  gameObj5.removeComponent('A11y');

  game.scene.addChild(gameObj1);
  game.scene.addChild(gameObj2);
  game.scene.addChild(gameObj3);
  game.scene.addChild(gameObj4);
  game.scene.addChild(gameObj5);
};

const loadEvent = game => {
  const image = new GameObject('image', {
    size: {width: 200, height: 200},
    origin: {x: 0, y: 1},
    position: {
      x: 0,
      y: 0,
    },
    anchor: {x: 0, y: 1},
  });
  const img = image.addComponent(
    new Img({
      resource: 'heart',
    }),
  );

  const evt = image.addComponent(
    new Event({
      // 使用这个属性设置交互事件可以触发的区域，骨骼动画有所变差，可以临时在当前游戏对象下添加一个同类型同属性的Graphic查看具体点击位置。
      hitArea: {
        type: HIT_AREA_TYPE.Polygon,
        style: {
          paths: [
            109,
            48,
            161,
            21,
            194,
            63,
            193,
            104,
            65,
            176,
            8,
            86,
            38,
            40,
            90,
            33,
          ],
        },
      },
    }),
  );
  //@ts-ignore
  evt.on('touchstart', e => {
    // alert('弹窗')
    console.log(e);
    console.log('touchstart');
  });
  image.addComponent(new A11y({hint: '双击触发弹窗'}));

  game.scene.addChild(image);
};
const loadSpine = game => {
  const gameObject = new GameObject('spine', {
    position: {
      x: 500,
      y: 500,
    },
    scale: {
      x: 0.5,
      y: 0.5,
    },
  });
  const spine = new Spine({resource: 'anim', animationName: 'idle'});
  gameObject.addComponent(spine);
  spine.on('complete', e => {
    console.log('动画播放结束', e.name);
  });
  spine.play('idle');

  gameObject.addComponent(
    new A11y({
      hint: 'hint',
      // delay: 100
    }),
  );

  game.scene.addChild(gameObject);
};
