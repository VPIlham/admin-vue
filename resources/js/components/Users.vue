<template>
    <div class="container">
        <div class="row mt-5">
            <!-- mt margin top  -->
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Users Table</h3>
                        <button type="button" class="btn btn-success" @click="createModal"> Add
                            New <i class="fas fa-user-plus fa-fw"></i></button>
                        <div class="card-tools">
                            <div class="input-group input-group-sm" style="width: 150px;">
                                <input type="text" name="table_search" class="form-control float-right" placeholder="Search">

                                <div class="input-group-append">
                                    <button type="submit" class="btn btn-default"><i class="fa fa-search"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body table-responsive p-0">
                        <table class="table table-hover">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>E-mail</th>
                                <th>Type</th>
                                <th>Register At</th>
                                <th>Action</th>
                            </tr>
                            <tr v-for="user in users" :key="user.id">
                                <td>{{user.id}}</td>
                                <td>{{user.name}}</td>
                                <td>{{user.email}}</td>
                                <td><span class="tag tag-success">{{user.type | upText}}</span></td>
                                <td>{{user.created_at | myDate}}</td>
                                <td>
                                    <a href="#" @click="editModal(user)">
                                        <i class="fa fa-edit"></i>
                                    </a>
                                    /
                                    <a href="#" @click="deleteUser(user.id)">
                                        <i class="fa fa-trash red"></i>
                                    </a>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <!-- /.card-body -->
                </div>
                <!-- /.card -->
            </div>
        </div><!-- /.row -->

        <!-- Modal -->
        <div class="modal fade" id="addNew" tabindex="-1" role="dialog" aria-labelledby="addNew" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" v-show="editmode" id="addNew">Edit user info</h5>
                        <h5 class="modal-title" v-show="!editmode" id="addNew">Tambah Baru</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form @submit.prevent="editmode ? updateUser() : createUser()">
                        <div class="modal-body">
                            <div class="form-group">
                                <label for="exampleInputEmail1">Name</label>
                                <input v-model="form.name" name="name" type="text" class="form-control" id="name"
                                    :class="{ 'is-invalid' : form.errors.has('name') }" placeholder="Enter name">

                                <has-error :form="form" field="name"></has-error>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Email address</label>
                                <input v-model="form.email" id="email" name="email" type="email" class="form-control"
                                    :class="{ 'is-invalid' : form.errors.has('email') }" placeholder="Enter email">

                                <has-error :form="form" field="email"></has-error>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Password</label>
                                <input v-model="form.password" id="password" name="password" type="password" class="form-control"
                                    :class="{ 'is-invalid' : form.errors.has('password') }" placeholder="Enter password">

                                <has-error :form="form" field="password"></has-error>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Bio</label>
                                <textarea v-model="form.bio" id="bio" type="text" class="form-control" :class="{ 'is-invalid' : form.errors.has('bio') }"
                                    placeholder="Enter short bio for user">
                            </textarea>
                                <has-error :form="form" field="bio"></has-error>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Type</label>
                                <select name="type" v-model="form.type" id="type" class="form-control" :class="{'is-invalid' :form.errors.has('type')}">
                                    <option value="">Select User role</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                    <option value="author">Author</option>
                                </select>
                                <has-error :form="form" field="type"></has-error>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Tutup</button>
                            <button v-show="editmode" type="submit" class="btn btn-primary">Edit data</button>
                            <button v-show="!editmode"  type="submit" class="btn btn-primary">Tambah baru</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                editmode : false,
                users: {},
                form: new Form({
                    id :'',
                    name: '',
                    email: '',
                    password: '',
                    type: '',
                    bio: '',
                    photo: ''
                })
            }
        },
        methods: {
            updateUser(){
                this.$Progress.start()
                this.form.put('api/user/'+this.form.id).then(()=>{
                    //success
                      $('#addNew').modal('hide');
                     swal(
                                    'Updated!',
                                    'Information has been updated.',
                                    'success'
                                )   
                     this.$Progress.finish();
                     Fire.$emit('AfterCreate');
                }).catch(() => {
                    this.$Progress.fail()
                });
            },
            createModal(){
                this.editmode = false;
                this.form.reset(); //reset di form ketika masih ada last isian 
                $('#addNew').modal('show');
            },
            editModal(user){
                this.editmode = true;
                this.form.reset(); //reset di form ketika masih ada last isian 
                $('#addNew').modal('show');
                this.form.fill(user);
            },
            deleteUser(id) {
                swal({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.value) { //kirim ke server
                        this.form.delete('api/user/' + id)
                            .then(() => {
                                swal(
                                    'Deleted!',
                                    'Your file has been deleted.',
                                    'success'
                                )
                                Fire.$emit('AfterCreate'); //langsung ke load data baru
                            })
                            .catch(() => {
                                swal(
                                    'Failed!',
                                    'Tidak berhasil, sesuatu ada yang salah',
                                    'warning'
                                );
                            });
                    }
                })
            },
            loadUser() {
                axios.get('api/user').then(({
                    data
                }) => (this.users = data.data));
            },
            createUser() {
                this.$Progress.start();

                this.form.post('api/user')
                    .then(() => { //jika sukses
                        Fire.$emit('AfterCreate'); //langsung ke load data baru
                        $('#addNew').modal('hide');

                        toast({
                            type: 'success',
                            title: 'Users Create in successfully'
                        });

                        this.$Progress.finish();
                    })
                    .catch(() => { //jika tidak / error

                    })
            }
        },
        created() {
            this.loadUser();
            Fire.$on('AfterCreate', () => {
                this.loadUser(); //dari sini langsung updated
            });
            // setInterval(() => {
            //     this.loadUser()
            // }, 3000);
        }
    }

</script>
