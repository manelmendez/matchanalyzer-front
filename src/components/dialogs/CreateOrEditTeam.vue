<template>
  <Dialog v-model:visible="show" modal header="Create Team" :style="{ width: '25rem' }">
    <span class="text-surface-500 dark:text-surface-400 block mb-8">Update your information.</span>
    <div class="flex items-center gap-4 mb-4">
      <!-- <label for="username" class="font-semibold w-24">Username</label>
      <InputText id="username" class="flex-auto" autocomplete="off" /> -->
      <!-- <FormField v-slot="$field" name="email" initialValue="" :resolver="customEmailResolver" class="flex flex-col gap-1">
        <InputText type="text" placeholder="Nombre del equipo" />
        <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}</Message>
      </FormField> -->
    </div>
    <div class="flex items-center gap-4 mb-8">
      <label for="email" class="font-semibold w-24">Email</label>
      <InputText id="email" class="flex-auto" autocomplete="off" />
    </div>
    <div class="flex justify-end gap-2">
      <!-- <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
      <Button type="button" label="Save" @click="visible = false"></Button> -->
    </div>
  </Dialog>
</template>

<script>
import { useConfirm } from "primevue/useconfirm";
import { onMounted } from "vue";
import { computed, ref } from "vue";

export default {
  props: {
    show: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  setup(props, { emit }) {
    const show = props.show
    const confirm = useConfirm();
    // const data = ref({
    //   match: {
    //     title: 'Quieres borrar este partido?',
    //     text: 'Si aceptas, el partido se borrará y se perderán todos sus datos. Quieres continuar?'
    //   },
    //   jornada: {
    //     title: 'Quieres borrar esta jornada?',
    //     text: 'Si aceptas, la jornada se borrará y se perderán todos sus partidos y datos estadísticos. Quieres continuar?'
    //   },
    //   player: {
    //     title: 'Quieres borrar este jugador?',
    //     text: 'Si aceptas, el jugador se borrará y se perderán todos sus datos. Quieres continuar?'
    //   },
    //   team: {
    //     title: 'Quieres borrar este equipo?',
    //     text: 'Si aceptas, el equipo se borrará y se perderán todos sus partidos y datos estadísticos. Quieres continuar?'
    //   },
    //   competition: {
    //     title: 'Quieres borrar esta competición?',
    //     text: 'Si aceptas, la competición se borrará y se perderán todos sus datos. Quieres continuar?'
    //   }
    // })

    // const header = computed(() => data.value[props.type].title)

    // const message = computed(() => data.value[props.type].text)

    onMounted(() => {
    //   confirm.require({
    //     message: message,
    //     header: header,
    //     icon: 'pi pi-info-circle',
    //     rejectLabel: 'Cancel',
    //     rejectProps: {
    //         label: 'Cancel',
    //         severity: 'secondary',
    //         outlined: true
    //     },
    //     acceptProps: {
    //         label: 'Delete',
    //         severity: 'danger'
    //     },
    //     accept: () => {
    //       emit('delete')
    //         // toast.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
    //     },
    //     reject: () => {
    //       emit('close')
    //         // toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    //     },
    //     onHide: () => {
    //       emit('close')
    //     }
    // });
    })
    return {
      confirm,
      show
    }
  }
}
</script>

<style scoped></style>
