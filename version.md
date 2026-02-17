<script setup>
import { getCurrentInstance } from 'vue'

const instance = getCurrentInstance()
const version = instance?.appContext.config.globalProperties.$version
</script>

# Version {{ version }}

* [CHANGELOG](./CHANGELOG.md)
* [RELEASE_NOTES](./RELEASE_NOTES.md)
