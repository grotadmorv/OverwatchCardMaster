import * as Animatable from 'react-native-animatable'

const animations = {

  rotate90Left: {
    from: {transform: [{rotate: '0deg'}]},
    to: {transform: [{rotate: '-90deg'}]}
  },

  rotate90LeftReverse: {
    from: {transform: [{rotate: '-90deg'}]},
    to: {transform: [{rotate: '0deg'}]}
  },

  rotate90Right: {
    from: {transform: [{rotate: '0deg'}]},
    to: {transform: [{rotate: '90deg'}]}
  },

  rotate90RightReverse: {
    from: {transform: [{rotate: '90deg'}]},
    to: {transform: [{rotate: '0deg'}]}
  },

  close: {
    from: {
      opacity: 1
    },
    to: {
      opacity: 0
    }
  },

  open: {
    from: {
      opacity: 0
    },
    to: {
      opacity: 1
    }
  },

  flipLeft: {
    from: {
      rotateY: '0deg'
    },
    to: {
      rotateY: '180deg'
    }
  },

  flipLeftReverse: {
    from: {
      rotateY: '180deg'
    },
    to: {
      rotateY: '0deg'
    }
  },

  flipUp: {
    from: {
      rotateX: '0deg'
    },
    to: {
      rotateX: '360deg'
    }
  },

  flipUpReverse: {
    from: {
      rotateX: '360deg'
    },
    to: {
      rotateX: '0deg'
    }
  },

  sizePulse: {
    0: {
      width: 120,
      height: 120,
      borderRadius: 60,
      opacity: 1,
      zIndex: 2
    },
    0.5: {
      opacity: 1,
      zIndex: 1
    },
    1: {
      width: 180,
      height: 180,
      borderRadius: 90,
      opacity: 0
    }
  }

}

Animatable.initializeRegistryWithDefinitions({rotate90Left: animations.rotate90Left})
Animatable.initializeRegistryWithDefinitions({rotate90LeftReverse: animations.rotate90LeftReverse})
Animatable.initializeRegistryWithDefinitions({rotate90Right: animations.rotate90Right})
Animatable.initializeRegistryWithDefinitions({rotate90RightReverse: animations.rotate90RightReverse})
Animatable.initializeRegistryWithDefinitions({close: animations.close})
Animatable.initializeRegistryWithDefinitions({open: animations.open})
Animatable.initializeRegistryWithDefinitions({flipLeft: animations.flipLeft})
Animatable.initializeRegistryWithDefinitions({flipLeftReverse: animations.flipLeftReverse})
Animatable.initializeRegistryWithDefinitions({flipUp: animations.flipUp})
Animatable.initializeRegistryWithDefinitions({flipUpReverse: animations.flipUpReverse})
Animatable.initializeRegistryWithDefinitions({sizePulse: animations.sizePulse})

export default Animatable
