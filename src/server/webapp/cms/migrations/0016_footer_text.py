# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-06-10 22:35
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cms', '0015_auto_20180526_1628'),
    ]

    operations = [
        migrations.AddField(
            model_name='footer',
            name='text',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
    ]