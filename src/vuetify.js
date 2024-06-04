// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import {VIcon} from 'vuetify/components'
import {VDivider} from 'vuetify/components'
import {VCard} from 'vuetify/components'
import {VTextField} from 'vuetify/components'
import {VRow} from 'vuetify/components'
import {VCol} from 'vuetify/components'
import {VBadge} from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
import { VStepper } from 'vuetify/labs/VStepper'
import { VStepperHeader } from 'vuetify/labs/VStepper'
import { VStepperItem } from 'vuetify/labs/VStepper'
import {VSpacer} from 'vuetify/components'
import {VAutocomplete} from 'vuetify/components'
import {VTable} from 'vuetify/components'
import {VCardItem} from 'vuetify/components'
import {VCardTitle} from 'vuetify/components'
import {VSelect} from 'vuetify/components'
import {VContainer} from 'vuetify/components'
import {VCardText} from 'vuetify/components'
import {VDialog} from 'vuetify/components'
import {VTabs} from 'vuetify/components'
import {VTab} from 'vuetify/components'
import {VToolbar} from 'vuetify/components'
import {VCardActions} from 'vuetify/components'
import {VWindowItem} from 'vuetify/components'
import {VWindow} from 'vuetify/components'
import {VBtnToggle} from 'vuetify/components'
import {VBtn} from 'vuetify/components'
import {VTextarea} from 'vuetify/components'
import {VDataTable} from "vuetify/labs/VDataTable";
import {VDatePicker} from "vuetify/labs/VDatePicker";

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  components:{
    VStepper, VDatePicker, VWindow, VCardActions, VToolbar, VDataTable, VTextarea, VBtn, VBtnToggle, VCardItem, VTab, VCardTitle, VSelect, VContainer, VCardText, VWindowItem, VTabs, VTable, VDialog, VDivider,VAutocomplete, VStepperHeader, VStepperItem, VIcon, VBadge, VRow, VTextField, VCard, VCol, VSpacer },
  directives,
})

export default vuetify