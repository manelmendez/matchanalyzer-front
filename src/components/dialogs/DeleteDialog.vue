<template>
  <ConfirmDialog></ConfirmDialog>
</template>

<script>
import { useConfirm } from "primevue/useconfirm";
import { onMounted } from "vue";
import { computed, ref } from "vue";

export default {
  props: {
    type: {
      type: String,
      required: true,
    },
    show: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  setup(props, { emit }) {
    const confirm = useConfirm();
    const data = ref({
      match: {
        title: 'Quieres borrar este partido?',
        text: 'Si aceptas, el partido se borrará y se perderán todos sus datos. Quieres continuar?'
      },
      jornada: {
        title: 'Quieres borrar esta jornada?',
        text: 'Si aceptas, la jornada se borrará y se perderán todos sus partidos y datos estadísticos. Quieres continuar?'
      },
      player: {
        title: 'Quieres borrar este jugador?',
        text: 'Si aceptas, el jugador se borrará y se perderán todos sus datos. Quieres continuar?'
      },
      team: {
        title: 'Quieres borrar este equipo?',
        text: 'Si aceptas, el equipo se borrará y se perderán todos sus partidos y datos estadísticos. Quieres continuar?'
      },
      competition: {
        title: 'Quieres borrar esta competición?',
        text: 'Si aceptas, la competición se borrará y se perderán todos sus datos. Quieres continuar?'
      }
    })

    const header = computed(() => data.value[props.type].title)

    const message = computed(() => data.value[props.type].text)

    onMounted(() => {
      confirm.require({
        message: message,
        header: header,
        icon: 'pi pi-info-circle',
        rejectLabel: 'Cancel',
        rejectProps: {
            label: 'Cancel',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Delete',
            severity: 'danger'
        },
        accept: () => {
          emit('delete')
            // toast.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
        },
        reject: () => {
          emit('close')
            // toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        },
        onHide: () => {
          emit('close')
        }
    });
    })
    return {
      confirm
    }
  }
}
</script>

<style scoped></style>
