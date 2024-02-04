<template>
  <q-btn size="sm" icon="share" @click="dialog = true" />

  <q-dialog
    v-model="dialog"
    full-width
    position="bottom"
    style="z-index: 9999999 !important"
    class="share-dialog"
    @touchmove.prevent
  >
    <q-card
      class="bg-grey-9"
      style="padding-bottom: 0.5rem; border-radius: 1rem 1rem 0 0"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      :style="{ transform: `translateY(${dialogPosition}px)` }"
    >
      <hr
        style="
          background: grey;
          width: 2.5rem;
          height: 0.3125rem;
          border-radius: 1rem;
          border: 0;
        "
      />

      <p class="text-h6 q-ml-lg q-mb-none">Share</p>

      <q-card-section class="row no-wrap">
        <q-scroll-area style="height: 6rem; width: 100%">
          <div class="row no-wrap">
            <div class="text-center">
              <copy-to-clipboard
                v-if="url"
                :source="url"
                icon="link"
                :show-source="false"
                icon-size="1.5rem"
                :flat="false"
                :round="true"
                button-class="q-ma-md btn-copy-link"
              />
              <div
                style="opacity: 0.7; font-size: 0.75rem; margin-top: -0.5rem"
              >
                Copy Link
              </div>
            </div>

            <div class="text-center" v-if="id">
              <copy-to-clipboard
                :source="id"
                :show-source="false"
                icon-size="1.5rem"
                :flat="false"
                :round="true"
                button-class="q-ma-md btn-copy-link"
              />
              <div
                style="opacity: 0.7; font-size: 0.75rem; margin-top: -0.5rem"
              >
                Copy ID
              </div>
            </div>
          </div>

          <div class="row no-wrap">
            <div class="text-center">
              <q-btn round class="q-ml-xs" @click="copy(url)">
                <q-icon :name="copied ? 'done' : 'link'" size="1.5rem" />
              </q-btn>

              <div
                style="opacity: 0.7; font-size: 0.75rem; margin-top: -0.5rem"
              >
                Copy Link
              </div>
            </div>
          </div>
        </q-scroll-area>
      </q-card-section>

      <hr class="section-divider" />

      <q-card-section>
        <q-scroll-area style="height: 100px; width: 100%">
          <div class="row no-wrap">
            <div
              v-for="(shareOption, index) in shareOptions"
              :key="index"
              class="text-center"
            >
              <q-btn
                @click="share(shareOption)"
                :icon="shareOption.icon"
                round
                size="1rem"
                :class="`q-ma-md btn-${shareOption.name.toLowerCase()}`"
              />
              <div
                style="opacity: 0.7; font-size: 0.75rem; margin-top: -0.5rem"
              >
                {{ shareOption.name }}
              </div>
            </div>
          </div>
        </q-scroll-area>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { useClipboard, useWindowSize } from '@vueuse/core';
import CopyToClipboard from '@koiner/components/copy-to-clipboard.vue';

export default defineComponent({
  name: 'ShareDialog',
  components: { CopyToClipboard },
  props: {
    url: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: false,
    },
    message: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const dialog = ref(false);
    const startY = ref(0);
    const dialogPosition = ref(0);

    const posY = ref(0);
    const { height } = useWindowSize();

    const copyId: Ref<string> = ref('');
    const { text, copy, copied, isSupported } = useClipboard({
      source: props.url,
    });

    const openPopup = () => {
      dialog.value = true;
    };
    const closePopup = () => {
      dialog.value = false;
      dialogPosition.value = 0;
    };

    const share = (shareOption: any) => {
      shareOption.action();
      closePopup();
    };

    const shareTo = (platform: string) => {
      switch (platform) {
        case 'telegram':
          const messageTelegram = `${props.message}`;
          const telegramLink = `https://t.me/share/url?url=${encodeURIComponent(
            props.url
          )}&text=${encodeURIComponent(messageTelegram)}`;
          window.open(telegramLink, '_blank');
          break;

        case 'x':
          const messageTwitter = `${props.message} ${props.url}`;
          const twitterLink = `https://x.com/intent/tweet?text=${encodeURIComponent(
            messageTwitter
          )}`;
          window.open(twitterLink, '_blank');
          break;

        case 'discord':
          const messageDiscord = `${props.message} ${props.url}`;
          const discordShareLink = 'https://discord.com/channels/@me';
          window.open(discordShareLink, '_blank');
          break;

        case 'signal':
          const messageSignal = `${props.message} ${props.url}`;
          const signalLink = `signal://send?text=${encodeURIComponent(
            messageSignal
          )}`;
          window.open(signalLink, '_blank');
          break;

        case 'whatsApp':
          const messageWhatsApp = `${props.message} ${props.url}`;
          const whatsappLink = `https://wa.me/?text=${encodeURIComponent(
            messageWhatsApp
          )}`;
          window.open(whatsappLink, '_blank');
          break;

        case 'facebook':
          const urlToShareFacebook = encodeURIComponent(props.url);
          const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${urlToShareFacebook}`;
          window.open(facebookLink, '_blank');
          break;

        case 'gmail':
          const subjectGmail = `${props.message}`;
          const bodyGmail = `${props.message} ${props.url}`;
          const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=&su=${encodeURIComponent(
            subjectGmail
          )}&body=${encodeURIComponent(bodyGmail)}`;
          window.location.href = gmailLink;
          break;

        case 'outlook':
          const subjectOutlook = `${props.message}`;
          const bodyOutlook = `${props.message} ${props.url}`;
          const outlookLink = `mailto:?subject=${encodeURIComponent(
            subjectOutlook
          )}&body=${encodeURIComponent(bodyOutlook)}`;
          window.location.href = outlookLink;
          break;

        case 'mail':
          const subjectMail = `${props.message}`;
          const bodyMail = `${props.message} ${props.url}`;
          const mailLink = `mailto:?subject=${encodeURIComponent(
            subjectMail
          )}&body=${encodeURIComponent(bodyMail)}`;
          window.location.href = mailLink;
          break;

        case 'sms':
          const messageSMS = `${props.message} ${props.url}`;
          const smsLink = `sms:?body=${encodeURIComponent(messageSMS)}`;
          window.location.href = smsLink;
          break;

        default:
          break;
      }
    };

    const onTouchStart = (event: { touches: { clientY: number }[] }) => {
      startY.value = event.touches[0].clientY;
    };

    const onTouchMove = (event: { touches: { clientY: number }[] }) => {
      const deltaY = event.touches[0].clientY - startY.value;

      // Only update if not swiping in bottom of dialog (social icons)
      if (height.value - startY.value > 160) {
        dialogPosition.value = Math.max(0, deltaY);
        posY.value = event.touches[0].clientY;
      }
    };

    const onTouchEnd = () => {
      // 80px from bottom and at least dragged 60px down
      if (posY.value > height.value - 80 && posY.value - startY.value > 60) {
        closePopup();
      } else {
        dialogPosition.value = 0;
      }

      startY.value = 0;
    };

    return {
      shareOptions: [
        {
          icon: 'fa-brands fa-telegram',
          name: 'Telegram',
          action: () => shareTo('telegram'),
        },
        {
          icon: 'fa-brands fa-x-twitter',
          name: 'X',
          action: () => shareTo('x'),
        },
        // {
        //   icon: 'fa-brands fa-discord',
        //   name: 'Discord',
        //   action: () => shareTo('discord'),
        // },
        // {
        //   icon: 'fa-brands fa-signal-messenger',
        //   name: 'signal',
        //   action: () => shareTo('Signal'),
        // },
        // {
        //   icon: 'fa-brands fa-whatsapp',
        //   name: 'WhatsApp',
        //   action: () => shareTo('whatsapp'),
        // },
        // {
        //   icon: 'fa-brands fa-facebook',
        //   name: 'Facebook',
        //   action: () => shareTo('facebook'),
        // },
        // {
        //   icon: 'fa-brands fa-gmail',
        //   name: 'Gmail',
        //   action: () => shareTo('gmail'),
        // },
        // { icon: 'outlook', name: 'Outlook', action: () => shareTo('outlook') },
        { icon: 'mail', name: 'Email', action: () => shareTo('mail') },
        { icon: 'sms', name: 'SMS', action: () => shareTo('sms') },
      ],

      dialog,
      share,
      closePopup,

      onTouchStart,
      onTouchMove,
      onTouchEnd,

      startY,
      posY,
      dialogPosition,

      // Copy link
      text,
      copy,
      copied,
      isSupported,
    };
  },
});
</script>
