<template>
  <div v-if="events">
    <ScheduleXCalendar class="planification-calendar" :calendar-app="calendarApp" />
  </div>
</template>
<script lang="ts">
import { ScheduleXCalendar } from '@schedule-x/vue'
import {
  CalendarEventExternal,
  createCalendar,
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek
} from '@schedule-x/calendar'
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'
import '@schedule-x/theme-default/dist/index.css'
import { useCalendarStore } from '@/stores/store'
import { CalendarEvent } from '@/models/calendarEvent'
import { computed, ComputedRef, onMounted } from 'vue'

export default {
  name: 'Planification',
  components: {
    ScheduleXCalendar
  },
  setup() {
    const calendarStore = useCalendarStore()
    const events: ComputedRef<CalendarEvent[]> = computed(() => calendarStore.events)
    const calendarApp = createCalendar({
      views: [
        createViewMonthGrid(),
        createViewMonthAgenda(),
        createViewWeek(),
        createViewDay()
      ],
      events: [],
      isDark: true,
      dayBoundaries: {
        start: '06:00',
        end: '22:00',
      },
      defaultView: createViewMonthGrid.name,
      callbacks: {
        /**
         * Is called when an event is updated through drag and drop
         * */
        async onEventUpdate(updatedEvent) {
          console.log('onEventUpdate', updatedEvent)
          let body = {
            id: updatedEvent.id,
            title: updatedEvent.title,
            description: updatedEvent.description,
            start: updatedEvent.start,
            end: updatedEvent.end,
            location: updatedEvent.location,
          }
          await calendarStore.updateEvent(body)
        },
      }
    }, [createDragAndDropPlugin()])

    const getInitialData = async () => {
      await calendarStore.getUserEvents()
      // Actualizar solo la propiedad `events` de `calendarApp`
      calendarApp.events.set(events.value.map((event) => {
        return {
          id: event.id,
          title: event.title.toString(),
          description: event.description,
          start: event.start.toString(),
          end: event.end.toString(),
          location: event.location.toString(),
        } as CalendarEventExternal
      }))
    }

    onMounted(() => {
      getInitialData()
    })
    return {
      calendarApp,
      events
    }
  }
}
</script>

<style>
.planification-calendar .sx-vue-calendar-wrapper {
  height: 100%;
}
.planification-calendar .sx__event {
  cursor: pointer;
}
</style>