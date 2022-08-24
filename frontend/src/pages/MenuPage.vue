<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-table
        title="Post list"
        :rows="posts"
        :columns="columnsPost"
        row-key="name"
      />
    </div>
    <div class="q-pa-md">
      <q-table
        title="Comment list"
        :rows="comments"
        :columns="columsComment"
        row-key="name"
      />
    </div>
    <div class="q-pa-md">
      <q-table
        title="Profil list"
        :rows="profil"
        :columns="ColumnsProfil"
        row-key="name"
      />
    </div>
    <!-- <q-item-label>titre {{ posts[1].title }}</q-item-label> -->
  </q-page>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { defineComponent, onMounted, ref } from 'vue';
export default defineComponent({
  // name: 'PageName'
  setup() {
    const $q = useQuasar();
    const posts = ref([]);
    const comments = ref([]);
    const profil = ref([]);
    const columnsPost = [
      {
        name: 'id',
        required: true,
        label: 'id',
        align: 'left',
        field: 'id',
        sortable: true,
      },
      {
        name: 'title',
        align: 'center',
        label: 'title',
        field: 'title',
        sortable: true,
      },
      { name: 'author', label: 'author', field: 'author', sortable: true },
    ];

    const columsComment = [
      {
        name: 'id',
        required: true,
        label: 'id',
        align: 'left',
        field: 'name',
        sortable: true,
      },
      {
        name: 'body',
        align: 'center',
        label: 'title',
        field: 'body',
        sortable: true,
      },
      { name: 'postId', label: 'author', field: 'postId', sortable: true },
    ];

    const ColumnsProfil = [
      {
        name: 'namepro',
        align: 'center',
        label: 'name',
        field: 'namepro',
        sortable: true,
      },
    ];
    onMounted(() => {
      getPost();
      getComments();
      getProfil();
    });

    const getPost = async () => {
      try {
        const { data } = await api.get('posts');
        posts.value = data;
      } catch (error) {}
    };

    const getComments = async () => {
      try {
        const { data } = await api.get('comments');
        comments.value = data;
      } catch (error) {}
    };

    const getProfil = async () => {
      try {
        const { data } = await api.get('profil');
        profil.value = data;
      } catch (error) {}
    };
    
    return {
      posts,
      columnsPost,
      columsComment,
      ColumnsProfil,
      comments,
      profil,
    };
  },
});
</script>
