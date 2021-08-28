<template>
  <node-view-wrapper
          :class="{ 'vue-component': true, 'inline': node.attrs.inline }"
          data-drag-handle
  >
    <div
            v-if="editMode"
            class="example-full"
    >
      <div
              v-show="$refs.upload && $refs.upload.dropActive"
              class="drop-active"
      >
        <h3>فایل را اینجا رها کنید</h3>
      </div>
      <div class="upload">
        <v-simple-table fixed-header>
          <template v-slot:default>
            <thead>
            <tr>
              <th>#</th>
              <th>تصویر</th>
              <th>نام فایل</th>
              <th>عرض</th>
              <th>ارتفاع</th>
              <th>حجم</th>
              <th>سرعت</th>
              <th>وضعیت</th>
              <th>فعالیت</th>
            </tr>
            </thead>
            <tbody>
            <tr v-if="!files.length">
              <td colspan="9">
                <div class="text-center p-5">
                  <h4>فایل ها را در این قسمت رها کنید</h4>
                </div>
              </td>
            </tr>
            <tr
                    v-for="(file, index) in files"
                    :key="file.id"
            >
              <td>{{ index }}</td>
              <td>
                <img
                        v-if="file.thumb"
                        class="td-image-thumb"
                        :src="file.thumb"
                >
                <span v-else>No Image</span>
              </td>
              <td>
                <div class="filename">
                  {{ file.name }}
                </div>
                <div
                        v-if="file.active || file.progress !== '0.00'"
                        class="progress"
                >
                  <div
                          :class="{'progress-bar': true, 'progress-bar-striped': true, 'bg-danger': file.error, 'progress-bar-animated': file.active}"
                          role="progressbar"
                          :style="{width: file.progress + '%'}"
                  >
                    {{ file.progress }}%
                  </div>
                </div>
              </td>
              <td>{{ file.width || 0 }}</td>
              <td>{{ file.height || 0 }}</td>
              <td>{{ formatSize(file.size) }}</td>
              <td>{{ formatSize(file.speed) }}</td>

              <td v-if="file.error">
                {{ file.error }}
              </td>
              <td v-else-if="file.success">
                success
              </td>
              <td v-else-if="file.active">
                active
              </td>
              <td v-else />
              <td>
                <v-btn
                        dark
                        small
                        fab
                        color="red"
                        @click.prevent="$refs.upload.remove(file)"
                >
                  <v-icon dark>
                    mdi-delete-forever
                  </v-icon>
                </v-btn>
                <v-btn
                        v-if="file.response && file.response.url"
                        dark
                        small
                        fab
                        color="blue"
                        @click.prevent="copyImageAddress(file.response.url)"
                >
                  <v-icon dark>
                    mdi-content-copy
                  </v-icon>
                </v-btn>

                <v-btn
                        v-if="node.attrs.url"
                        small
                        dark
                        fab
                        color="green"
                        @click="editMode = false"
                >
                  <v-icon dark>
                    mdi-check
                  </v-icon>
                </v-btn>


                <v-btn
                        v-if="false"
                        dark
                        small
                        fab
                        color="purple"
                        :disabled="file.active || file.success || file.error === 'compressing' || file.error === 'image parsing'"
                        @click.prevent="file.active || file.success || file.error === 'compressing' ? false : onEditFileShow(file)"
                >
                  <v-icon dark>
                    mdi-file-document-edit-outline
                  </v-icon>
                </v-btn>

                <div
                        v-if="false"
                        class="btn-group"
                >
                  <button
                          class="btn btn-secondary btn-sm dropdown-toggle"
                          type="button"
                  >
                    Action
                  </button>
                  <div class="dropdown-menu">
                    <a
                            :class="{'dropdown-item': true, disabled: file.active || file.success || file.error === 'compressing' || file.error === 'image parsing'}"
                            href="#"
                            @click.prevent="file.active || file.success || file.error === 'compressing' ? false : onEditFileShow(file)"
                    >Edit</a>
                    <a
                            :class="{'dropdown-item': true, disabled: !file.active}"
                            href="#"
                            @click.prevent="file.active ? $refs.upload.update(file, {error: 'cancel'}) : false"
                    >Cancel</a>

                    <a
                            v-if="file.active"
                            class="dropdown-item"
                            href="#"
                            @click.prevent="$refs.upload.update(file, {active: false})"
                    >Abort</a>
                    <a
                            v-else-if="file.error && file.error !== 'compressing' && file.error !== 'image parsing' && $refs.upload.features.html5"
                            class="dropdown-item"
                            href="#"
                            @click.prevent="$refs.upload.update(file, {active: true, error: '', progress: '0.00'})"
                    >Retry upload</a>
                    <a
                            v-else
                            :class="{'dropdown-item': true, disabled: file.success || file.error === 'compressing' || file.error === 'image parsing'}"
                            href="#"
                            @click.prevent="file.success || file.error === 'compressing' || file.error === 'image parsing' ? false : $refs.upload.update(file, {active: true})"
                    >Upload</a>

                    <div class="dropdown-divider" />
                    <a
                            class="dropdown-item"
                            href="#"
                            @click.prevent="$refs.upload.remove(file)"
                    >Remove</a>
                  </div>
                </div>
              </td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
        <div class="example-foorer">
          <div
                  v-if="false"
                  class="footer-status float-right"
          >
            Drop: {{ $refs.upload ? $refs.upload.drop : false }},
            Active: {{ $refs.upload ? $refs.upload.active : false }},
            Uploaded: {{ $refs.upload ? $refs.upload.uploaded : true }},
            Drop active: {{ $refs.upload ? $refs.upload.dropActive : false }}
          </div>
          <file-upload
                  ref="upload"
                  v-model="files"
                  :post-action="postAction"
                  :extensions="extensions"
                  :accept="accept"
                  :multiple="multiple"
                  :directory="directory"
                  :create-directory="createDirectory"
                  :size="size || 0"
                  :thread="thread < 1 ? 1 : (thread > 5 ? 5 : thread)"
                  :headers="headers"
                  :data="data"
                  :drop="drop"
                  :drop-directory="dropDirectory"
                  :add-index="addIndex"
                  @input-filter="inputFilter"
                  @input-file="inputFile"
          >
            <v-btn
                    v-if="!node.attrs.url"
                    dark
                    color="purple"
            >
              یک فایل را انتخاب کنید
            </v-btn>
          </file-upload>
          <v-divider v-if="!node.attrs.url" />
          <v-btn
                  v-if="!$refs.upload || !$refs.upload.active && !node.attrs.url"
                  dark
                  color="purple"
                  @click.prevent="$refs.upload.active = true"
          >
            شروع آپلود
          </v-btn>
          <v-btn
                  v-else-if="!node.attrs.url"
                  dark
                  color="purple"
                  @click.prevent="$refs.upload.active = false"
          >
            توقف آپلود
          </v-btn>
        </div>
      </div>
      <div
              v-if="false"
              :class="{'modal-backdrop': true, 'fade': true, show: addData.show}"
      />
      <div
              v-if="false"
              id="modal-add-data"
              :class="{modal: true, fade: true, show: addData.show}"
              tabindex="-1"
              role="dialog"
      >
        <div
                class="modal-dialog"
                role="document"
        >
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">
                Add data
              </h5>
              <button
                      type="button"
                      class="close"
                      @click.prevent="addData.show = false"
              >
                <span>&times;</span>
              </button>
            </div>
            <form @submit.prevent="onAddData">
              <div class="modal-body">
                <div class="form-group">
                  <label for="data-name">Name:</label>
                  <input
                          id="data-name"
                          v-model="addData.name"
                          type="text"
                          class="form-control"
                          required
                          placeholder="Please enter a file name"
                  >
                  <small class="form-text text-muted">Such as <code>filename.txt</code></small>
                </div>
                <div class="form-group">
                  <label for="data-type">Type:</label>
                  <input
                          id="data-type"
                          v-model="addData.type"
                          type="text"
                          class="form-control"
                          required
                          placeholder="Please enter the MIME type"
                  >
                  <small class="form-text text-muted">Such as <code>text/plain</code></small>
                </div>
                <div class="form-group">
                  <label for="content">Content:</label>
                  <textarea
                          id="content"
                          v-model="addData.content"
                          class="form-control"
                          required
                          rows="3"
                          placeholder="Please enter the file contents"
                  />
                </div>
              </div>
              <div class="modal-footer">
                <button
                        type="button"
                        class="btn btn-secondary"
                        @click.prevent="addData.show = false"
                >
                  Close
                </button>
                <button
                        type="submit"
                        class="btn btn-primary"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
              v-if="false"
              :class="{'modal-backdrop': true, 'fade': true, show: editFile.show}"
      />
      <div
              v-if="false"
              id="modal-edit-file"
              :class="{modal: true, fade: true, show: editFile.show}"
              tabindex="-1"
              role="dialog"
      >
        <div
                class="modal-dialog modal-lg"
                role="document"
        >
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">
                Edit file
              </h5>
              <button
                      type="button"
                      class="close"
                      @click.prevent="editFile.show = false"
              >
                <span>&times;</span>
              </button>
            </div>
            <form @submit.prevent="onEditorFile">
              <div class="modal-body">
                <div class="form-group">
                  <label for="name">Name:</label>
                  <input
                          id="name"
                          v-model="editFile.name"
                          type="text"
                          class="form-control"
                          required
                          placeholder="Please enter a file name"
                  >
                </div>
                <div
                        v-if="editFile.show && editFile.blob && editFile.type && editFile.type.substr(0, 6) === 'image/'"
                        class="form-group"
                >
                  <label>Image: </label>
                  <div class="edit-image">
                    <img
                            ref="editImage"
                            :src="editFile.blob"
                    >
                  </div>

                  <div class="edit-image-tool">
                    <div
                            class="btn-group"
                            role="group"
                    >
                      <button
                              type="button"
                              class="btn btn-primary"
                              title="cropper.rotate(-90)"
                              @click="editFile.cropper.rotate(-90)"
                      >
                        <i
                                class="fa fa-undo"
                                aria-hidden="true"
                        />
                      </button>
                      <button
                              type="button"
                              class="btn btn-primary"
                              title="cropper.rotate(90)"
                              @click="editFile.cropper.rotate(90)"
                      >
                        <i
                                class="fa fa-repeat"
                                aria-hidden="true"
                        />
                      </button>
                    </div>
                    <div
                            class="btn-group"
                            role="group"
                    >
                      <button
                              type="button"
                              class="btn btn-primary"
                              title="cropper.crop()"
                              @click="editFile.cropper.crop()"
                      >
                        <i
                                class="fa fa-check"
                                aria-hidden="true"
                        />
                      </button>
                      <button
                              type="button"
                              class="btn btn-primary"
                              title="cropper.clear()"
                              @click="editFile.cropper.clear()"
                      >
                        <i
                                class="fa fa-remove"
                                aria-hidden="true"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                        type="button"
                        class="btn btn-secondary"
                        @click.prevent="editFile.show = false"
                >
                  Close
                </button>
                <button
                        type="submit"
                        class="btn btn-primary"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <v-hover v-slot="{ hover }" class="image-parent">
      <div
              ref="resizer"
              :style="{ width: '100%', height: editMode ? 0 + 'px' : height + 'px', position: 'relative' }"
              :class="{ 'center': node.attrs.justify === 'center', 'image': true }"
      >
        <VueDragResize
                v-if="!editMode"
                :sticks="['br', 'bl']"
                :aspect-ratio="true"
                :x="left"
                :y="top"
                :is-active="true"
                :is-draggable="false"
                :w="width"
                :h="height"
                :parent-w="$refs.resizer.clientWidth"
                :parent-h="800"
                :parent-limitation="true"
                @resizing="resize"
        >
          <img
                  :src="node.attrs.url"
                  width="100%"
                  :style="{ marginBottom: -1 * vertical + 'px' }"
          />
        </VueDragResize>
        <v-slider
                v-if="node.attrs.inline"
                :max="height"
                :min="-1 * height"
                :height="'61'"
                vertical
                v-model="vertical"
                @change="updateVertical"
                dense
                class="mr-5 ml-1"
        ></v-slider>
        <v-btn-toggle
                v-if="hover && !node.attrs.inline"
                v-model="toggleJustify"
                class="toggle-justify"
        >
          <v-btn
                  value="right"
                  @click="setJustify('right')"
          >
            <v-icon>mdi-format-align-right</v-icon>
          </v-btn>

          <v-btn
                  value="center"
                  @click="setJustify('center')"
          >
            <v-icon>mdi-format-align-center</v-icon>
          </v-btn>

          <v-btn
                  value="left"
                  @click="setJustify('left')"
          >
            <v-icon>mdi-format-align-left</v-icon>
          </v-btn>
        </v-btn-toggle>
      </div>
    </v-hover>
  </node-view-wrapper>
</template>

<script>
  import Cropper from 'cropperjs'
  import ImageCompressor from '@xkeshi/image-compressor'
  import FileUpload from 'vue-upload-component'
  import Vue from 'vue'
  import VueDragResize from 'vue-drag-resize'
  import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-2'

  Vue.component('vue-drag-resize', VueDragResize)


  export default {
    components: {
      FileUpload,
      NodeViewWrapper,
      VueDragResize
    },
    props: {
      nodeViewProps,
      node: {
        type: Object,
        required: true
      },
      updateAttributes: {
        type: Function,
        required: true,
      },
      // postAction,
      // putAction
    },
    data() {
      return {
        vertical: 0,
        toggleJustify: null,
        width: 0,
        height: 0,
        top: 0,
        left: 20,
        editMode: true,
        // postAction: '/api/v1/question/upload/5ffdf5345590063ba07fad54',
        // putAction: '/api/v1/question/upload/5ffdf5345590063ba07fad54',
        url: '',
        files: [],
        accept: 'image/png,image/gif,image/jpeg,image/webp',
        extensions: 'gif,jpg,jpeg,png,webp',
        // extensions: ['gif', 'jpg', 'jpeg','png', 'webp'],
        // extensions: /\.(gif|jpe?g|png|webp)$/i,
        minSize: 1,
        size: 1024 * 1024 * 10,
        multiple: true,
        directory: false,
        drop: true,
        dropDirectory: true,
        createDirectory: false,
        addIndex: false,
        thread: 3,
        name: 'file',
        // postAction: '/upload/post',
        // putAction: '/upload/put',
        data: {
          // '_csrf_token': 'xxxxxx',
        },
        autoCompress: 1024 * 1024,
        uploadAuto: false,
        addData: {
          show: false,
          name: '',
          type: '',
          content: '',
        },
        editFile: {
          show: false,
          name: '',
        }
      }
    },
    computed: {
      accessToken () {
        return this.node.attrs.token
      },
      headers () {
        return {
          Authorization: 'Bearer ' + this.accessToken
        }
      },
      postAction () {
        return this.node.attrs.upload
      },
      putAction() {
        return this.node.attrs.upload
      },
    },
    watch: {
      vertical () {
        console.log('vertical', this.vertical)
      },
      'node.attrs.vertical' () {
        console.log('node', this.node.attrs.vertical)
      },
      'node.attrs.justify' () {
        if (this.node.attrs.justify === 'right') {
          this.left = (this.$refs.resizer.clientWidth) - (this.width) - 20
        }

        if (this.node.attrs.justify === 'left') {
          this.left = 20
        }

        this.toggleJustify = this.node.attrs.justify
      },
      'editFile.show'(newValue, oldValue) {
        if (!newValue && oldValue) {
          this.$refs.upload.update(this.editFile.id, { error: this.editFile.error || '' })
        }
        if (newValue) {
          this.$nextTick( () => {
            if (!this.$refs.editImage) {
              return
            }
            let cropper = new Cropper(this.$refs.editImage, {
              autoCrop: false,
            })
            this.editFile = {
              ...this.editFile,
              cropper
            }
          })
        }
      },
      'addData.show'(show) {
        if (show) {
          this.addData.name = ''
          this.addData.type = ''
          this.addData.content = ''
        }
      },
    },
    methods: {
      updateVertical () {
        this.updateAttributes({
          vertical: -1 * this.vertical
        })
      },
      setJustify (justify) {
        this.updateAttributes({
          justify
        })
      },
      resize(newRect) {
        this.width = newRect.width;
        this.height = newRect.height;
        this.updateAttributes({
          width: this.width,
          height: this.height
        })
      },
      copyImageAddress (url) {
        const el = document.createElement('textarea')
        el.value = '![](' + url + ')'
        document.body.appendChild(el)
        el.select()
        document.execCommand('copy')
        document.body.removeChild(el)
        this.$notify({
          group: 'notifs',
          title: 'توجه',
          text: 'آدرس فایل به کلیپبورد منتقل شد',
          type: 'success'
        })
      },
      formatSize (size) {
        if (size > 1024 * 1024 * 1024 * 1024) {
          return (size / 1024 / 1024 / 1024 / 1024).toFixed(2) + ' TB'
        } else if (size > 1024 * 1024 * 1024) {
          return (size / 1024 / 1024 / 1024).toFixed(2) + ' GB'
        } else if (size > 1024 * 1024) {
          return (size / 1024 / 1024).toFixed(2) + ' MB'
        } else if (size > 1024) {
          return (size / 1024).toFixed(2) + ' KB'
        }
        return size.toString() + ' B'
      },
      inputFilter(newFile, oldFile, prevent) {
        if (newFile && !oldFile) {
          // Before adding a file
          // 添加文件前
          // Filter system files or hide files
          // 过滤系统文件 和隐藏文件
          if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
            return prevent()
          }
          // Filter php html js file
          // 过滤 php html js 文件
          if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
            return prevent()
          }
          // Automatic compression
          // 自动压缩
          if (newFile.file && newFile.error === '' && newFile.type.substr(0, 6) === 'image/' && this.autoCompress > 0 && this.autoCompress < newFile.size) {
            newFile.error = 'compressing'
            const imageCompressor = new ImageCompressor(null, {
              convertSize: 1024 * 1024,
              maxWidth: 512,
              maxHeight: 512,
            })
            imageCompressor.compress(newFile.file)
                    .then((file) => {
                      this.$refs.upload.update(newFile, { error: '', file, size: file.size, type: file.type })
                    })
                    .catch((err) => {
                      this.$refs.upload.update(newFile, { error: err.message || 'compress' })
                    })
          }
        }
        if (newFile && newFile.error === '' && newFile.file && (!oldFile || newFile.file !== oldFile.file)) {
          // Create a blob field
          // 创建 blob 字段
          newFile.blob = ''
          let URL = (window.URL || window.webkitURL)
          if (URL) {
            newFile.blob = URL.createObjectURL(newFile.file)
          }
          // Thumbnails
          // 缩略图
          newFile.thumb = ''
          if (newFile.blob && newFile.type.substr(0, 6) === 'image/') {
            newFile.thumb = newFile.blob
          }
        }
        // image size
        // image 尺寸
        if (newFile && newFile.error === '' && newFile.type.substr(0, 6) === 'image/' && newFile.blob && (!oldFile || newFile.blob !== oldFile.blob)) {
          newFile.error = 'image parsing'
          let img = new Image();
          img.onload = () => {
            this.$refs.upload.update(newFile, {error: '', height: img.height, width: img.width})
          }
          img.οnerrοr = () => {
            this.$refs.upload.update(newFile, { error: 'parsing image size'})
          }
          img.src = newFile.blob
        }
      },
      updateNodeAfterUpload () {
        this.files.forEach((file) => {
          if (file.response.url) {
            this.updateAttributes({
              url: file.response.url,
              width: file.width,
              height: file.height
            })
            this.height = file.height
            this.width = file.width
          }
        })
      },
      // add, update, remove File Event
      inputFile(newFile, oldFile) {
        if (newFile && oldFile) {
          // update
          if (newFile.active && !oldFile.active) {
            // beforeSend
            // min size
            if (newFile.size >= 0 && this.minSize > 0 && newFile.size < this.minSize) {
              this.$refs.upload.update(newFile, { error: 'size' })
            }
          }
          if (newFile.progress !== oldFile.progress) {
            // progress
          }
          if (newFile.error && !oldFile.error) {
            // error
          }
          if (newFile.success && !oldFile.success) {
            // success
            this.updateNodeAfterUpload()
          }
        }
        if (!newFile && oldFile) {
          // remove
          if (oldFile.success && oldFile.response.id) {
            // $.ajax({
            //   type: 'DELETE',
            //   url: '/upload/delete?id=' + oldFile.response.id,
            // })
          }
        }
        // Automatically activate upload
        if (Boolean(newFile) !== Boolean(oldFile) || oldFile.error !== newFile.error) {
          if (this.uploadAuto && !this.$refs.upload.active) {
            this.$refs.upload.active = true
          }
        }
      },
      alert(message) {
        alert(message)
      },
      onEditFileShow(file) {
        this.editFile = { ...file, show: true }
        this.$refs.upload.update(file, { error: 'edit' })
      },
      onEditorFile() {
        if (!this.$refs.upload.features.html5) {
          this.alert('Your browser does not support')
          this.editFile.show = false
          return
        }
        let data = {
          name: this.editFile.name,
          error: '',
        }
        if (this.editFile.cropper) {
          let binStr = atob(this.editFile.cropper.getCroppedCanvas().toDataURL(this.editFile.type).split(',')[1])
          let arr = new Uint8Array(binStr.length)
          for (let i = 0; i < binStr.length; i++) {
            arr[i] = binStr.charCodeAt(i)
          }
          data.file = new File([arr], data.name, { type: this.editFile.type })
          data.size = data.file.size
        }
        this.$refs.upload.update(this.editFile.id, data)
        this.editFile.error = ''
        this.editFile.show = false
      },
      // add folder
      onAddFolder() {
        if (!this.$refs.upload.features.directory) {
          this.alert('Your browser does not support')
          return
        }
        let input = document.createElement('input')
        input.style = 'background: rgba(255, 255, 255, 0);overflow: hidden;position: fixed;width: 1px;height: 1px;z-index: -1;opacity: 0;'
        input.type = 'file'
        input.setAttribute('allowdirs', true)
        input.setAttribute('directory', true)
        input.setAttribute('webkitdirectory', true)
        input.multiple = true
        document.querySelector('body').appendChild(input)
        input.click()
        input.onchange = () => {
          this.$refs.upload.addInputFile(input).then(function() {
            document.querySelector('body').removeChild(input)
          })
        }
      },
      onAddData() {
        this.addData.show = false
        if (!this.$refs.upload.features.html5) {
          this.alert('Your browser does not support')
          return
        }
        let file = new window.File([this.addData.content], this.addData.name, {
          type: this.addData.type,
        })
        this.$refs.upload.add(file)
      }
    },
    created() {
      setTimeout(() => {
        if (this.node.attrs.url) {
          this.editMode = false
          this.height = this.node.attrs.height
          this.width = this.node.attrs.width
          if (!this.width && !this.height) {
            this.width = 100
            this.height = 100
          }
          this.vertical = -1 * this.node.attrs.vertical
          console.log('2', this.node.attrs.vertical)
        }

        if (this.node.attrs.justify === 'right') {
          this.left = (this.$refs.resizer.clientWidth) - (this.width) - 20
        }

        if (this.node.attrs.justify === 'left') {
          this.left = 20
        }


        this.toggleJustify = this.node.attrs.justify
      }, 550)

    }
  }
</script>

<style scoped>
  .toggle-justify {
    position: absolute;
    left: 10px;
    top: -40px;
    opacity: 0.47;
  }

  .center {
    display: flex !important;
    justify-content: center !important;
  }

  .center .vdr {
    position: relative !important;
    left: 0 !important;
  }

  .inline {
    display: inline-block;
  }

  .inline .image-parent,
  .inline .image {
    width: max-content;
    padding: 0 10px;
  }

  .example-full .btn-group .dropdown-menu {
    display: block;
    visibility: hidden;
    transition: all .2s
  }
  .example-full .btn-group:hover > .dropdown-menu {
    visibility: visible;
  }
  .example-full label.dropdown-item {
    margin-bottom: 0;
  }
  .example-full .btn-group .dropdown-toggle {
    margin-right: .6rem
  }
  .td-image-thumb {
    max-width: 4em;
    max-height: 4em;
  }
  .example-full .filename {
    margin-bottom: .3rem
  }
  .example-full .btn-is-option {
    margin-top: 0.25rem;
  }
  .example-full .example-foorer {
    padding: .5rem 0;
    border-top: 1px solid #e9ecef;
    border-bottom: 1px solid #e9ecef;
  }
  .example-full .edit-image img {
    max-width: 100%;
  }
  .example-full .edit-image-tool {
    margin-top: .6rem;
  }
  .example-full .edit-image-tool .btn-group{
    margin-right: .6rem;
  }
  .example-full .footer-status {
    padding-top: .4rem;
  }
  .example-full .drop-active {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    position: fixed;
    z-index: 9999;
    opacity: .6;
    text-align: center;
    background: #000;
  }
  .example-full .drop-active h3 {
    margin: -.5em 0 0;
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    font-size: 40px;
    color: #fff;
    padding: 0;
  }

  .example-full .upload th {
    text-align: center !important;
    line-height: 48px;
  }
</style>
