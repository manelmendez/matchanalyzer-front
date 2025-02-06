import { definePreset } from "@primevue/themes";
import Aura from '@primevue/themes/aura'

export const Emerald = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{emerald.50}',
      100: '{emerald.100}',
      200: '{emerald.200}',
      300: '{emerald.300}',
      400: '{emerald.400}',
      500: '{emerald.500}',
      600: '{emerald.600}',
      700: '{emerald.700}',
      800: '{emerald.800}',
      900: '{emerald.900}',
      950: '{emerald.950}'
    },
    colorScheme: {
      light: {
        formField: {
          hoverBorderColor: '{primary.color}'
        }
      },
      dark: {
        formField: {
          hoverBorderColor: '{primary.color}'
        }
      }
    },
  },
  components: {
    card: {
      colorScheme: {
        light: {
          root: {
            background: '{surface.0}',
            color: '{surface.700}'
          },
          subtitle: {
            color: '{surface.500}'
          }
        },
        dark: {
          root: {
            background: '{surface.900}',
            color: '{surface.0}'
          },
          subtitle: {
            color: '{surface.400}'
          }
        }
      }
    },
    avatar: {
      colorScheme: {
        light: {
          root: {
            color: '{surface.0}'
          }
        },
        dark: {
          root: {
            color: '{surface.900}'
          }
        }
      }
    }
  }
});

export const Indigo = definePreset(Aura, {
  semantic: {
      primary: {
          50: '{indigo.50}',
          100: '{indigo.100}',
          200: '{indigo.200}',
          300: '{indigo.300}',
          400: '{indigo.400}',
          500: '{indigo.500}',
          600: '{indigo.600}',
          700: '{indigo.700}',
          800: '{indigo.800}',
          900: '{indigo.900}',
          950: '{indigo.950}'
      }
  }
});

export const Red = definePreset(Aura, {
  semantic: {
      primary: {
          50: '{red.50}',
          100: '{red.100}',
          200: '{red.200}',
          300: '{red.300}',
          400: '{red.400}',
          500: '{red.500}',
          600: '{red.600}',
          700: '{red.700}',
          800: '{red.800}',
          900: '{red.900}',
          950: '{red.950}'
      }
  }
});

export const Lime = definePreset(Aura, {
  semantic: {
      primary: {
          50: '{lime.50}',
          100: '{lime.100}',
          200: '{lime.200}',
          300: '{lime.300}',
          400: '{lime.400}',
          500: '{lime.500}',
          600: '{lime.600}',
          700: '{lime.700}',
          800: '{lime.800}',
          900: '{lime.900}',
          950: '{lime.950}'
      }
  }
});

export const Amber = definePreset(Aura, {
  semantic: {
      primary: {
          50: '{amber.50}',
          100: '{amber.100}',
          200: '{amber.200}',
          300: '{amber.300}',
          400: '{amber.400}',
          500: '{amber.500}',
          600: '{amber.600}',
          700: '{amber.700}',
          800: '{amber.800}',
          900: '{amber.900}',
          950: '{amber.950}'
      }
  }
});

export const Teal = definePreset(Aura, {
  semantic: {
      primary: {
          50: '{teal.50}',
          100: '{teal.100}',
          200: '{teal.200}',
          300: '{teal.300}',
          400: '{teal.400}',
          500: '{teal.500}',
          600: '{teal.600}',
          700: '{teal.700}',
          800: '{teal.800}',
          900: '{teal.900}',
          950: '{teal.950}'
      }
  }
});

export const Cyan = definePreset(Aura, {
  semantic: {
      primary: {
          50: '{cyan.50}',
          100: '{cyan.100}',
          200: '{cyan.200}',
          300: '{cyan.300}',
          400: '{cyan.400}',
          500: '{cyan.500}',
          600: '{cyan.600}',
          700: '{cyan.700}',
          800: '{cyan.800}',
          900: '{cyan.900}',
          950: '{cyan.950}'
      }
  }
});

export const Sky = definePreset(Aura, {
  semantic: {
      primary: {
          50: '{sky.50}',
          100: '{sky.100}',
          200: '{sky.200}',
          300: '{sky.300}',
          400: '{sky.400}',
          500: '{sky.500}',
          600: '{sky.600}',
          700: '{sky.700}',
          800: '{sky.800}',
          900: '{sky.900}',
          950: '{sky.950}'
      }
  }
});

export const Stone = definePreset(Aura, {
  semantic: {
    primary: {
        50: '{stone.50}',
        100: '{stone.100}',
        200: '{stone.200}',
        300: '{stone.300}',
        400: '{stone.400}',
        500: '{stone.500}',
        600: '{stone.600}',
        700: '{stone.700}',
        800: '{stone.800}',
        900: '{stone.900}',
        950: '{stone.950}'
    },
    colorScheme: {
      light: {
        formField: {
          hoverBorderColor: '{primary.color}'
        }
      },
      dark: {
        formField: {
          hoverBorderColor: '{primary.color}'
        }
      }
    }
  }
});