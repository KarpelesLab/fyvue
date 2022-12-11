<script setup>
import {
  KeyIcon,
  CogIcon,
  GifIcon,
  EyeDropperIcon,
} from '@heroicons/vue/24/solid';
import {
  DiscordIcon,
  FacebookIcon,
  InstagramIcon,
  TelegramIcon,
  TwitterIcon,
  CoinMarketCapIcon,
  GoogleIcon,
  LinkedInIcon,
  OpenSeaIcon,
  RedditIcon,
  TiktokIcon,
  VkIcon,
  YoutubeIcon,
} from '@fy-/ui';
</script>
<template>
  <NavSide
    :links="[
      { to: '/', name: 'DiscordIcon', icon: DiscordIcon },
      { to: '/', name: 'FacebookIcon', icon: FacebookIcon },
      { to: '/test', name: 'InstagramIcon', icon: InstagramIcon },
      { to: '/', name: 'TelegramIcon', icon: TelegramIcon },
      { to: '/', name: 'TwitterIcon', icon: TwitterIcon },
      { to: '/', name: 'CoinMarketCapIcon', icon: CoinMarketCapIcon },
      { to: '/', name: 'GoogleIcon', icon: GoogleIcon },
      { to: '/', name: 'LinkedInIcon', icon: LinkedInIcon },
      { to: '/', name: 'OpenSeaIcon', icon: OpenSeaIcon },
      { to: '/', name: 'RedditIcon', icon: RedditIcon },
      { to: '/', name: 'TiktokIcon', icon: TiktokIcon },
      { to: '/', name: 'VkIcon', icon: VkIcon },
      { to: '/', name: 'YoutubeIcon', icon: YoutubeIcon },
    ]"
  />
</template>
