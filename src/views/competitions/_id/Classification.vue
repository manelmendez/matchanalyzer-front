<template>
  <div v-if="rounds">
    <div v-if="rounds.length == 0">
      <Card class="no-data">
        <template #content>
          Aun no hay ninguna jornada disputada
          <br />
        </template>
      </Card>
    </div>
    <div v-else class="grid gap-8">
      <Card>
        <template #content>
          <div
            class="grid grid-cols-1 max-md:justify-items-center md:grid-cols-2 gap-2"
          >
            <Select
              @change="roundChange"
              v-model="round"
              :options="rounds"
              optionLabel="name"
              size="small"
              placeholder="Selecciona ronda"
              class="w-42"
            />
            <div class="flex max-md:flex-col justify-end gap-4 items-center">
              <div class="flex items-center gap-2">
                Ver detalles<ToggleSwitch v-model="details" />
              </div>
              <div>
                <Button
                  label="Anterior"
                  icon="pi pi-angle-double-left"
                  iconPos="left"
                  @click="previousRound"
                  size="small"
                />
              </div>
              <div>
                <Button
                  label="Siguiente"
                  icon="pi pi-angle-double-right"
                  iconPos="right"
                  @click="nextRound"
                  size="small"
                  :disabled="
                    (round ? round.id : null) ==
                    (rounds && rounds.length
                      ? rounds[rounds.length - 1].id
                      : null)
                  "
                />
              </div>
            </div>
          </div>
        </template>
      </Card>
      <Card>
        <template #content>
          <ClassificationTable
            :rankedTeams="rankedTeams"
            :details="details"
          ></ClassificationTable>
        </template>
      </Card>
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import { useCompetitionStore, useUserStore } from "@/stores/store";
import { computed, ref, onMounted } from "vue";
import constants from "@/assets/constants/constants";
import ClassificationTable from "@/components/competitions/classification/ClassificationTable.vue";

export default {
  name: "classification-page",
  components: {
    ClassificationTable,
  },
  setup() {
    const details = ref(false);
    const userStore = useUserStore();
    const competitionStore = useCompetitionStore();
    const router = useRouter();

    const user = computed(() => userStore.user);
    const competition = computed(() =>
      competitionStore.competitionById(
        Number(router.currentRoute.value.params.id)
      )
    );
    const rounds = computed(() => competitionStore.rounds);
    const round = computed(() =>
      competitionStore.round(router.currentRoute.value.params.roundId)
    );
    const rankedTeams = computed(() =>
      competitionStore.rankedTeams(router.currentRoute.value.params.roundId)
    );
    const roundChange = (originalEvent: any) => {
      //coger el numero de round y ponerlo en selectedRound
      let str = originalEvent.value.name;
      let res = str.split(" ");
      competitionStore.selectedRound = Number(res[1]);
      router.push({
        name: "rankings",
        params: {
          id: Number(router.currentRoute.value.params.id),
          roundId: res[1],
        },
      });
    };
    const previousRound = () => {
      const actualRound =
        router.currentRoute.value.params.roundId == "latest"
          ? rounds.value?.length
          : router.currentRoute.value.params.roundId;
      competitionStore.selectedRound = Number(actualRound) - 1;
      router.push({
        name: "rankings",
        params: {
          id: router.currentRoute.value.params.id,
          roundId: Number(actualRound) - 1,
        },
      });
    };
    const nextRound = () => {
      const actualRound =
        router.currentRoute.value.params.roundId == "latest"
          ? rounds.value?.length
          : router.currentRoute.value.params.roundId;
      competitionStore.selectedRound = Number(actualRound) + 1;
      router.push({
        name: "rankings",
        params: {
          id: router.currentRoute.value.params.id,
          roundId: Number(actualRound) + 1,
        },
      });
    };

    const getInitialData = async () => {
      await competitionStore.getUserCompetitions(Number(user.value.id));
      if (competition.value) {
        await competitionStore.getCompetitionRounds(
          Number(competition.value.id)
        );
      }
    };
    onMounted(() => {
      getInitialData();
    });

    return {
      constants,
      details,
      competition,
      rounds,
      round,
      roundChange,
      previousRound,
      nextRound,
      rankedTeams,
    };
  },
};
</script>
<style scoped>
.no-data {
  width: 100%;
}
</style>
