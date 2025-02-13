<template>
  <Dialog v-model:visible="show" modal header="Crear Competición" :closable="false" :style="{ width: 'max-content' }">
    <Form @submit="onFormSubmit" class="inputs">
      <div class="grid md:grid-cols-2 justify-center gap-4">
        <FormField v-slot="$field" name="name" :resolver="customNameResolver">
          <InputText type="text" placeholder="Nombre del equipo" v-model="name"/>
          <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}</Message>
        </FormField>
        <FormField v-slot="$field" name="season" :resolver="customSelectResolver">
          <Select :options="seasonOptions" placeholder="Elige una temporada" style="width: 100%;" v-model="season"/>
          <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}</Message>
        </FormField>
        <FormField v-slot="$field" name="discipline" :resolver="customSelectResolver">
          <Select :options="disciplineOptions" placeholder="Elige una disciplina" style="width: 100%;" v-model="discipline"/>
          <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}</Message>
        </FormField>
        <FormField v-slot="$field" name="category" :resolver="customSelectResolver">
          <Select :disabled="discipline == null" :options="discipline == 'F7' ? categoryOptionsF7 : categoryOptionsF11" v-model="category" placeholder="Elige una categoria" style="width: 100%;" />
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
import { ref, computed, reactive } from "vue";
import constants from "@/assets/constants/constants";
import { useUserStore, useCompetitionStore } from "@/stores/store";

export default {
  props: {
    show: {
      type: Boolean,
      required: true,
      default: false
    },
    competition: {
      type: Object,
      required: false
    }
  },
  setup(props, { emit }) {
    const show = props.show
    const competition = props.competition ? props.competition : null
    const userStore = useUserStore()
    const competitionStore = useCompetitionStore()

    const user = computed(() => userStore.user)

    const name = ref(competition ? competition.name : null)
    const season = ref(competition ? competition.season : null)
    const discipline = ref(competition ? competition.discipline : null)
    const category = ref(competition ? competition.category : null)

    const refs = {name:name, season:season, discipline:discipline, category:category}


    const seasonOptions = ref(constants.seasons)
    const disciplineOptions = ref(constants.disciplines)
    const categoryOptionsF7 = ref(constants.categoriesF7)
    const categoryOptionsF11 = ref(constants.categoriesF7)
    
    const onFormSubmit = ({valid}) => {
      if (valid) {
        let competitionSubmitted = {
          name: name.value,
          season: season.value,
          discipline: discipline.value,
          category: category.value
        }
        submit(competitionSubmitted)
      }
    }

    const submit = async(competitionSubmitted) => {
      competitionSubmitted.managerId = user.value.id
      if (competition) {
        const data = {
          id: competition.id,
          body: competitionSubmitted
        }
        competitionStore.updateCompetition(data).then((response) => {
          if (response.status === 200) {
            emit('confirm')
          }
        })
      }
      else {
        competitionStore.addCompetition(competitionSubmitted).then((response) => {
          if (response.status === 200) {
            emit('confirm')
          }
        })
      }
    }
    
    const close = () => {
      emit('close')
    }

    const customNameResolver = () => {
      const errors = { name: []};      
      if (!name.value) {
          errors.name.push({ type: 'required', message: 'Name is required.' });
      }
      if (name.value?.length < 3) {
          errors.name.push({ type: 'minimum', message: 'Name must be at least 3 characters long.' });
      }
      return {
          errors
      };
    };
    
    const customSelectResolver = ({ name,value }) => {
      const errors = { [name]: [] };      
      if (!refs[name].value) {
        errors[name].push({ type: 'required', message: 'One selection is required.' });
      }
      return {
        errors
      };
    };

    return {
      show,
      customNameResolver,
      customSelectResolver,
      seasonOptions,
      disciplineOptions,
      categoryOptionsF7,
      categoryOptionsF11,
      onFormSubmit,
      close,
      name,
      season,
      discipline,
      category
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
.forms {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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
