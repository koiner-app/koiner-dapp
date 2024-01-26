<template>
  <q-btn size="sm" icon="share" @click="dialog = true" class="q-pl-none" />
  <q-dialog
    v-model="dialog"
    full-width
    persistent
    position="bottom"
    style="z-index: 9999999 !important"
    class="share-dialog"
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

      <p class="text-h6 q-ml-xl">Share on</p>

      <q-card-section class="row wrap justify-center">
        <div class="text-center">
          <copy-to-clipboard
            :source="url"
            :show-source="false"
            icon="link"
            icon-size="md"
            :flat="false"
            :round="true"
          />
          <div>Copy Link</div>
        </div>
      </q-card-section>

      <hr style="opacity: 0.1" />

      <q-card-section class="row wrap justify-center">
        <div
          v-for="(shareOption, index) in shareOptions"
          :key="index"
          class="text-center"
        >
          <q-btn
            @click="share(shareOption)"
            :icon="`fa-brands fa-${shareOption.icon}`"
            round
            :class="`q-ma-md btn-${shareOption.icon}`"
          />
          <div>{{ shareOption.icon }}</div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import CopyToClipboard from '@koiner/components/copy-to-clipboard.vue';
import { useWindowSize } from '@vueuse/core';

export default defineComponent({
  name: 'ShareDialog',
  components: { CopyToClipboard },
  props: {
    url: {
      type: String,
      required: true,
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
          const whatsappLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(
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
          const gmailLink = `mailto:?subject=${encodeURIComponent(
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
      dialogPosition.value = Math.max(0, deltaY);
      posY.value = event.touches[0].clientY;
    };

    const onTouchEnd = () => {
      if (posY.value > height.value - 80) {
        closePopup();
      } else {
        dialogPosition.value = 0;
      }

      startY.value = 0;
    };

    return {
      shareOptions: [
        { icon: 'telegram', action: () => shareTo('telegram') },
        { icon: 'x', action: () => shareTo('x') },
        { icon: 'discord', action: () => shareTo('discord') },
        // { icon: 'signal', action: () => shareTo('Signal') },
        { icon: 'whatsapp', action: () => shareTo('whatsapp') },
        { icon: 'facebook', action: () => shareTo('facebook') },
        { icon: 'gmail', action: () => shareTo('gmail') },
        { icon: 'outlook', action: () => shareTo('outlook') },
        { icon: 'sms', action: () => shareTo('sms') },
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
    };
  },
});
</script>
