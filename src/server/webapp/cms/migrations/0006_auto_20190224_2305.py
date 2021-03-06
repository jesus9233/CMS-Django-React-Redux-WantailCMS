# -*- coding: utf-8 -*-
# Generated by Django 1.11.15 on 2019-02-24 23:05
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('wagtailimages', '0020_add-verbose-name'),
        ('cms', '0005_blogpage'),
    ]

    operations = [
        migrations.AddField(
            model_name='blogpage',
            name='description',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='blogpage',
            name='listing_iamge',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='wagtailimages.Image'),
        ),
    ]
