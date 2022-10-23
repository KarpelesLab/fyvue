<template>
  <FyDatatable
    v-model:data="groups.data"
    v-if="groups"
    :headers="{
      Name: $t('workgroups_headers_name'),
      Type: $t('workgroups_headers_type'),
      Owner: $t('workgroups_headers_owner'),
      Actions: $t('workgroups_headers_actions'),
    }"
  >
    <template v-slot:Owner_item="property">
      {{ property.data.item.Owner.Email }}
    </template>
    <template v-slot:Name_item="property">
      <span class="text-md font-medium">{{ property.data.item.Name }}</span>
    </template>
    <template v-slot:Actions_item="property">
      <div class="flex space-x-2" v-if="property.data.item.Type != 'user'">
        <button
          class="btn primary px-2 py-1 text-sm"
          @click="
            () => {
              addUserModal(property.data.item.User_Group__);
            }
          "
        >
          <UserPlusIcon
            stroke="currentColor"
            class="h-5 -mt-0.5 align-middle inline-block"
          />
          {{ $t("workgroup_add_user_modal_cta") }}
        </button>
        <button
          class="btn primary px-2 py-1 text-sm"
          @click="
            () => {
              _getGroupUsers(1, property.data.item.User_Group__);
            }
          "
        >
          <UsersIcon
            stroke="currentColor"
            class="h-5 -mt-0.5 align-middle inline-block"
          />
          {{ $t("workgroup_users_modal_cta") }}
        </button>
        <button
          class="btn primary px-2 py-1 text-sm"
          @click="
            () => {
              _deleteGroup(
                property.data.item.User_Group__,
                property.data.item.Name
              );
            }
          "
        >
          <TrashIcon
            stroke="currentColor"
            class="h-5 -mt-0.5 align-middle inline-block"
          />
          {{ $t("workgroup_delete_cta") }}
        </button>
      </div>
      <div v-else>n/a</div>
    </template>
  </FyDatatable>

  <FyModal id="AddUserGroup" :title="$t('workgroup_user_add_title')">
    <p class="default-p -mt-6 mb-3" v-if="groupUsers">
      {{ $t("workgroup_summary_group") }} <b>{{ groupUsers.data.Name }}</b>
      <small>
        ({{ $t("workgroup_summary_owned_by") }}
        <i>{{ groupUsers.data.Owner.Email }}</i
        >)</small
      >
    </p>

    <p class="default-p my-2">{{ $t("workgroup_user_add_description") }}</p>
    <form @submit.prevent="_addUserToGroup()">
      <FyInput
        id="groupUserEmail"
        :req="true"
        :showLabel="true"
        :placeholder="$t('workgroup_useradd_email_placeholder')"
        :validate="v$.user.email"
        :label="$t('workgroup_useradd_email_label')"
        type="text"
        autocomplete="off"
      ></FyInput>
      <FyInput
        id="groupUserRole"
        :req="true"
        :showLabel="true"
        :validate="v$.user.role"
        :options="roles"
        :label="$t('workgroup_useradd_role_placeholder')"
        type="select"
        autocomplete="off"
      ></FyInput>
      <div
        class="default-p-err mt-4"
        v-if="addUserGroupError && addUserGroupError.token"
      >
        {{ $t(addUserGroupError.token) }}
      </div>
      <button class="btn primary btn-defaults" type="submit">
        {{ $t("add_user_to_group_cta") }}
      </button>
    </form>
    <p class="default-p mt-4 mb-4">
      {{ $t("workgroup_user_add_invite_link_description") }}
    </p>
    <form
      @submit.prevent="
        () => {
          generateAccessLink();
        }
      "
      class="flex flex-nowrap items-stretch w-full"
    >
      <input
        type="text"
        aria-invalid="false"
        disabled="true"
        style="border: 1px solid #eee"
        class="input-basic"
        v-model="accessLinkLink"
      />
      <button
        class="btn accent p-3"
        style="border-radius: 0; border: 3px solid #eee"
        v-if="accessLinkLink"
        @click.prevent="
          () => {
            copyText(accessLinkLink, undefined, () => {});
            notify(
              {
                group: 'default',
                title: $t('notif_success_title'),
                text: $t('workgroup_link_invite_copy_confirm'),
              },
              4000
            );
          }
        "
      >
        <ClipboardDocumentIcon
          stroke="currentColor"
          class="h-5 -mt-0.5 align-middle inline-block"
        />
      </button>
      <button
        class="btn primary p-3"
        style="border-radius: 0; border: 3px solid #eee"
        type="submit"
      >
        {{ $t("group_invite_link_cta") }}
      </button>
    </form>
  </FyModal>
  <FyModal id="GroupUsers" :title="$t('workgroup_user_list_title')">
    <button
      v-if="groupUsers"
      class="btn primary px-2 py-1 text-sm float-right -mt-8"
      @click="
        () => {
          addUserModal(groupUsers.data.User_Group__);
          $eventBus.emit('GroupUsersModal', false);
        }
      "
    >
      <UserPlusIcon
        stroke="currentColor"
        class="h-5 -mt-0.5 align-middle inline-block"
      />
      {{ $t("workgroup_add_user_modal_cta") }}
    </button>
    <p class="default-p -mt-6 mb-3" v-if="groupUsers">
      {{ $t("workgroup_summary_group") }} <b>{{ groupUsers.data.Name }}</b>
      <small>
        ({{ $t("workgroup_summary_owned_by") }}
        <i>{{ groupUsers.data.Owner.Email }}</i
        >)</small
      >
    </p>
    <FyDatatable
      v-model:data="groupUsers.data.Members"
      v-if="groupUsers"
      :headers="{
        Name: $t('workgroups_users_headers_name'),
        Access: $t('workgroups_users_headers_access'),
        Actions: $t('workgroups_users_headers_actions'),
      }"
    >
      <template v-slot:Actions_item="property">
        <button
          class="btn primary p-2 fround"
          @click="
            () => {
              $eventBus.emit('showConfirm', {
                title: $t('workgroup_del_user_confirm_title'),
                desc: `${$t('workgroup_del_user_confirm_desc')} (${
                  property.data.item.User.Display_Name
                } from ${groupUsers.data.Name}).`,
                onConfirm: async () => {
                  await _delUserFromGroup(property.data.item.User.User__);
                },
              });
            }
          "
        >
          <UserMinusIcon
            stroke="currentColor"
            class="h-5 -mt-0.5 align-middle inline-block"
          />
        </button>
      </template>

      <template v-slot:Name_item="property">
        {{ property.data.item.User.Profile.Display_Name }}
        <small>({{ property.data.item.User.Email }})</small>
      </template>
      <template v-slot:Access_item="property">
        {{ getRole(property.data.item.Access) }}
      </template>
    </FyDatatable>
  </FyModal>
  <FyModal id="GroupAdd" :title="$t('workgroup_add_title_modal')">
    <form @submit.prevent="_addGroup">
      <FyInput
        id="groupName"
        :req="true"
        :showLabel="true"
        :placeholder="$t('workgroup_name_placeholder')"
        :validate="v$.group.groupName"
        :label="$t('workgroup_name_label')"
        type="text"
        autocomplete="off"
      ></FyInput>
      <button class="btn primary btn-defaults" type="submit">
        {{ $t("create_group_cta") }}
      </button>
    </form>
  </FyModal>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import { useEventBus } from "./../..";
import {
  getGroups,
  groupLinkAccess,
  addUserToGroup,
  delUserFromGroup,
  addGroup,
  delGroup
} from "./../../klb/api/user";
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import {
  ClipboardDocumentIcon,
  UserMinusIcon,
  UserPlusIcon,
  TrashIcon,
  UsersIcon,
} from "@heroicons/vue/24/solid";
import { copyText } from "vue3-clipboard";
import { notify } from "notiwind";
import { useTranslation } from "i18next-vue";

const props = defineProps({
  // eslint-disable-lin
  roles: {
    type: Array,
    default: [
      ["A", "Administrator"],
      ["W", "Write access"],
      ["C", "Create access"],
      ["R", "View only"],
    ],
  },
  joinURL: String,
});
const eventBus = useEventBus();
const { i18next } = useTranslation();
const state = reactive({
  group: {
    groupName: "",
  },
  user: {
    email: "",
    role: "R",
  },
});
const rules = {
  group: {
    groupName: { required },
  },
  user: {
    email: { required, email },
    role: { required },
  },
};
const v$ = useVuelidate(rules, state);
const groupUsers = ref(null);
const groups = ref(null);
const user = ref(null);
const accessLink = ref(null);
const accessLinkLink = ref(null);
const addUserGroupError = ref(null);
const getRole = (role) => {
  if (role === "O") return "Owner";
  return props.roles.filter((r) => r[0] == role)[0][1];
};
const _deleteGroup = async (groupUuid, name) => {
  eventBus.emit("showConfirm", {
    title: i18next.t("workgroup_del_group_confirm_title"),
    desc: i18next.t("workgroup_del_group_confirm_desc", {
      group: name,
    }),
    onConfirm: async () => {
      eventBus.emit("loading", true);
      await delGroup(groupUuid);
      await _getGroups();
      eventBus.emit("loading", false);
      eventBus.emit("resetConfirm", true);
    },
  });
};
const _addUserToGroup = async () => {
  eventBus.emit("loading", true);
  if (await v$.value.user.$validate()) {
    addUserGroupError.value = null;
    let result = await addUserToGroup(
      groupUsers.value.data.User_Group__,
      state.user.email,
      state.user.role
    ).catch((err) => {
      addUserGroupError.value = err;
      eventBus.emit("loading", false);
      return;
    });

    if (result.result == "success") {
      eventBus.emit("AddUserGroupModal", false);
      await _getGroupUsers(1, groupUsers.value.data.User_Group__);
    }
  }
  eventBus.emit("loading", false);
};
const _delUserFromGroup = async (user) => {
  eventBus.emit("loading", true);
  await delUserFromGroup(groupUsers.value.data.User_Group__, user);
  await _getGroupUsers(1, groupUsers.value.data.User_Group__);
  eventBus.emit("resetConfirm", true);
  eventBus.emit("loading", false);
};
const generateAccessLink = async () => {
  eventBus.emit("loading", true);
  accessLink.value = await groupLinkAccess(
    groupUsers.value.data.User_Group__,
    state.user.role
  );
  accessLinkLink.value = props.joinURL + accessLink.value.data.Link;
  eventBus.emit("loading", false);
};
const addUserModal = async (groupUuid) => {
  eventBus.emit("loading", true);
  groupUsers.value = await getGroups(groupUuid);
  eventBus.emit("AddUserGroupModal", true);
  eventBus.emit("loading", false);
};
const _addGroup = async () => {
  eventBus.emit("loading", true);
  if (await v$.value.group.$validate()) {
    await addGroup(state.group.groupName);
    await _getGroups();
    eventBus.emit("GroupAddModal", false);
  }
  eventBus.emit("loading", false);
};
const _getGroupUsers = async (page = 1, groupUuid) => {
  eventBus.emit("loading", true);
  eventBus.emit("GroupUsersModal", true);
  groupUsers.value = await getGroups(groupUuid);
  eventBus.emit("loading", false);
};
const _getGroups = async (page = 1, groupUuid = undefined) => {
  eventBus.emit("loading", true);
  groups.value = await getGroups(groupUuid);
  eventBus.emit("loading", false);
};
onMounted(async () => {
  await _getGroups();
});
</script>
