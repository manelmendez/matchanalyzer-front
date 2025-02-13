<template>
  <Dialog v-model:visible="show" modal header="Crear Equipo" :closable="false" :style="{ width: 'max-content' }">
    <Form :initialValues @submit="onFormSubmit" class="inputs">
      <div class="grid md:grid-cols-3 justify-center gap-4">
        <FileUpload ref="fileupload" mode="basic" name="demo[]" url="/images" accept="image/*" :maxFileSize="1000000"/>
        <FormField v-slot="$field" name="name" :resolver="customNameResolver">
          <InputText type="text" placeholder="Nombre del equipo" />
          <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}</Message>
        </FormField>
        <FormField v-slot="$field" name="season" :resolver="customSelectSeasonResolver">
          <Select :options="seasonOptions" optionLabel="" placeholder="Elige una temporada" style="width: 100%;" />
          <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}</Message>
        </FormField>
      </div>
      <div class="buttons">
        <Button type="button" label="Cancel" severity="secondary" @click="close"></Button>
        <Button type="submit" label="Save"></Button>
      </div>
    </Form>
  </Dialog>
</template>

<script>
import { ref, reactive, computed } from "vue";
import constants from "@/assets/constants/constants";
import { useUserStore, useTeamStore } from "@/stores/store";

export default {
  props: {
    show: {
      type: Boolean,
      required: true,
      default: false
    },
    team: {
      type: Object,
      required: false
    },
    myTeam: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const show = props.show
    const myTeam = props.myTeam
    const team = props.team ? props.team : null
    const fileupload = ref();
    const userStore = useUserStore()
    const teamStore = useTeamStore()

    const user = computed(() => userStore.user)
    
    const initialValues = reactive({
        name: team ? team.name : '',
        season: team ? team.season : ''
    });
    const seasonOptions = ref(constants.seasons)
    
    const onFormSubmit = ({states, valid}) => {
      if (valid) {
        let teamSubmitted = {
          name: states.name.value,
          season: states.season.value
        }
        submit(teamSubmitted)
      }
    }

    const submit = async(teamSubmitted) => {
      let imageResponse = null
      if (fileupload.value.hasFiles) {
        try {
          imageResponse = await uploadImage()
        } catch (error) {
          console.log(error)
        }
      }
      if (myTeam) {
        teamSubmitted.managerId = user.value.id
        teamSubmitted.avatar = imageResponse != null ? constants.IMAGES_URL+imageResponse.data.filename : null
        if (team) {
          const data = {
            id: team.id,
            body: {
              team: teamSubmitted
            }
          }
          teamStore.updateTeam(data).then((response) => {
            if (response.status === 200) {
              emit('confirm')
            }
          })
        }
        else {
          teamStore.addTeam(teamSubmitted).then((response) => {
            if (response.status === 200) {
              emit('confirm')
            }
          })
        }
      }
      else {
        teamStore.addNoManagerTeam(teamSubmitted).then((response) => {
          if (response.status === 200) {
            emit('confirm')
          }
        })
      }
    }
    
    const uploadImage = async() => {      
      const fd = new FormData()
      fd.append('image', fileupload.value.files[0], fileupload.value.files[0].name.replace(/ /g, ""))
      try {
        const response = await teamStore.uploadImage(fd)
        return(response)
      } catch (err) {
        console.log(err)
      }
    }
    
    const close = () => {
      emit('close')
    }

    const customNameResolver = ({ value }) => {
      const errors = { name: []};      
      if (!value) {
          errors.name.push({ type: 'required', message: 'Name is required.' });
      }
      if (value?.length < 3) {
          errors.name.push({ type: 'minimum', message: 'Name must be at least 3 characters long.' });
      }
      return {
          errors
      };
    };
    
    const customSelectSeasonResolver = ({ value }) => {
      const errors = { season: []};      
      if (!value) {
          errors.season.push({ type: 'required', message: 'Season is required.' });
      }
      return {
          errors
      };
    };

    return {
      show,
      customNameResolver,
      customSelectSeasonResolver,
      initialValues,
      seasonOptions,
      onFormSubmit,
      close,
      fileupload
    }
  }
}
</script>

<style scoped>
.inputs {
  display: grid;
  grid-auto-flow: row;
  justify-content: center;
  gap: 2em;
}
.buttons {
  display: grid;
  grid-auto-flow: column;
  justify-content: end;
  gap: 1em;
}
</style>
